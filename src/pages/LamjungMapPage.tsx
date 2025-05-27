import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BackgroundDecoration } from '../components/BackgroundDecoration';
import { OverallStatsView } from '../components/maps/OverallStatsView';

// GeoJSON will be fetched, so direct import is removed.

// Updated household data interface
interface HouseholdData {
  id: number;
  name: string;
  position: LatLngExpression;
  interviews: number;
  interviewLink: string;
  caste: string; // Changed from distributionData.caste
  sourceOfIncome: string; // New field
  // distributionData for individual charts might be removed or simplified
  // For now, let's assume the detailed distribution for individual households is not shown as pie charts in the right panel
  // We will focus on aggregated data and specific household text details.
  ageGroupData?: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }; // Optional, if we want to show this for selected HH
  genderData?: { labels: string[]; datasets: { data: number[]; backgroundColor: string[] }[] }; // Optional
  displaced: 'Yes' | 'No';
  agree: 'Yes' | 'No'; // Renaming to satisfiedWithProject for clarity later if needed
  gender: 'Male' | 'Female'; // New field for gender distribution
  educationLevel: string; // New field for education level
}

const households: HouseholdData[] = [
  {
    id: 1,
    name: 'Household 1 (Besisahar Area)',
    position: [28.2306, 84.3706], // Centered more on Besisahar
    interviews: 3,
    interviewLink: '#interview-alpha',
    caste: 'Gurung',
    sourceOfIncome: 'Agriculture, Tourism, Shop',
    ageGroupData: { labels: ['0-18', '19-40', '41-60', '>60'], datasets: [{ data: [5, 12, 8, 3], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }] },
    genderData: { labels: ['Male', 'Female', 'Other'], datasets: [{ data: [10, 15, 1], backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'] }] },
    displaced: 'No',
    agree: 'Yes',
    gender: 'Female',
    educationLevel: 'Secondary',
  },
  {
    id: 2,
    name: 'Household 2 (Rural North)',
    position: [28.3500, 84.4200], // More to the north of Besisahar
    interviews: 5,
    interviewLink: '#interview-beta',
    caste: 'Brahmin',
    sourceOfIncome: 'Remittance, Livestock, Agriculture',
    ageGroupData: { labels: ['0-18', '19-40', '41-60', '>60'], datasets: [{ data: [2, 8, 10, 5], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }] },
    genderData: { labels: ['Male', 'Female'], datasets: [{ data: [12, 13], backgroundColor: ['#36A2EB', '#FF6384'] }] },
    displaced: 'Yes',
    agree: 'No',
    gender: 'Male',
    educationLevel: 'Bachelors Degree',
  },
  {
    id: 3,
    name: 'Household 3 (Near Mid-Marsyangdi)',
    position: [28.2882, 84.3169], // West of Besisahar, towards a hydro project area
    interviews: 2,
    interviewLink: '#interview-gamma',
    caste: 'Chhetri',
    sourceOfIncome: 'Hydropower, Shop, Agriculture, Remittance',
    displaced: 'No',
    agree: 'Yes',
    gender: 'Female',
    educationLevel: 'No formal education',
  },
  {
    id: 4,
    name: 'Household 4 (Eastern Valley)',
    position: [28.2150, 84.4100],
    interviews: 4,
    interviewLink: '#interview-delta',
    caste: 'Gurung',
    sourceOfIncome: 'Agriculture, Livestock',
    displaced: 'No',
    agree: 'Yes',
    gender: 'Male',
    educationLevel: 'No formal education',
  },
  {
    id: 5,
    name: 'Household 5 (Southern Hills)',
    position: [28.1800, 84.3500],
    interviews: 3,
    interviewLink: '#interview-epsilon',
    caste: 'Chhetri',
    sourceOfIncome: 'Tourism, Shop',
    displaced: 'Yes',
    agree: 'No',
    gender: 'Female',
    educationLevel: 'Secondary',
  },
];

// Fix for default icon issue with Webpack/React-Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Bounding box for Lamjung District (expanded to prevent cropping)
const lamjungBounds = L.latLngBounds(
  L.latLng(27.85, 83.95), // Southwest corner - expanded
  L.latLng(28.65, 84.75)  // Northeast corner - expanded
);

const geoJsonStyle = {
  color: '#FF0000',    // Bright Red for the boundary line
  weight: 3,          // Thicker line
  opacity: 1,         // Fully opaque line
  fillColor: '#00FFFF', // Cyan fill
  fillOpacity: 0.3    // Slightly more opaque fill to make it visible
};

const testGeoJsonStyle = {
  color: '#00FF00',    // Bright Green for test boundary
  weight: 2,
  opacity: 1,
  fillColor: '#FFFF00', // Yellow fill
  fillOpacity: 0.2
};


export const LamjungMapPage = () => {
  const lamjungMapCenter: LatLngExpression = [28.2380, 84.3725];
  const initialZoom = 10;

  // To ensure popups are sized correctly after map initializes, especially if content is dynamic
  const mapRef = React.useRef<L.Map>(null);
  const [lamjungGeoJson, setLamjungGeoJson] = useState<any>(null);
  const [testGeoJson, setTestGeoJson] = useState<any>(null); // For debugging - render first district
  const [lamjungCenter, setLamjungCenter] = useState<LatLngExpression | null>(null);

  // Function to calculate the centroid of a polygon
  const calculateCentroid = (coordinates: number[][][]) => {
    let totalLat = 0;
    let totalLng = 0;
    let totalPoints = 0;

    coordinates.forEach(ring => {
      ring.forEach(point => {
        totalLng += point[0]; // longitude
        totalLat += point[1]; // latitude
        totalPoints++;
      });
    });

    return [totalLat / totalPoints, totalLng / totalPoints] as LatLngExpression;
  };

  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        // Use the correct filename for the nepal districts GeoJSON
        const response = await fetch('/data/geojson/nepal-districts.geojson');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allDistrictsData = await response.json();

        // Look for Lamjung with various possible property names
        const districtFeature = (allDistrictsData as any)?.features?.find(
          (feature: any) => {
            const props = feature.properties;
            // Check multiple possible property names and values for Lamjung
            const districtName = (
              props?.DISTRICT ||
              props?.DIST_EN ||
              props?.DISTRICT_N ||
              props?.Name ||
              props?.name ||
              props?.DISTRICT_NAME ||
              props?.district ||
              props?.District ||
              props?.DIST_NAME ||
              props?.dist_name ||
              ''
            ).toString().toUpperCase();

            return districtName === 'LAMJUNG';
          }
        );

        if (districtFeature) {
          console.log('Found Lamjung feature:', districtFeature);

          // Check if this has standard GeoJSON coordinate structure
          console.log('Lamjung geometry type:', districtFeature.geometry?.type);
          if (districtFeature.geometry?.coordinates) {
            console.log('Coordinates structure looks standard:', Array.isArray(districtFeature.geometry.coordinates[0]));
            if (Array.isArray(districtFeature.geometry.coordinates[0]) && Array.isArray(districtFeature.geometry.coordinates[0][0])) {
              console.log('First coordinate pair:', districtFeature.geometry.coordinates[0][0]);
            }
          }

          setLamjungGeoJson(districtFeature);
          setLamjungCenter(calculateCentroid(districtFeature.geometry.coordinates));
        } else {
          console.warn("Lamjung district GeoJSON feature not found. Check console for property names and values.");

          // FALLBACK: Log all district names to see what's available
          console.log('Available districts:', allDistrictsData.features?.map((f: any) => {
            const props = f.properties;
            return props?.DISTRICT || props?.name || props?.Name || props?.district || props?.DIST_EN || props?.DISTRICT_N || 'Unknown';
          }).slice(0, 20)); // Show first 20 districts
        }
      } catch (error) {
        console.error("Failed to fetch or parse GeoJSON:", error);
      }
    };

    fetchGeoJson();
  }, []);

  return (
    <div className="relative bg-stone-50 min-h-screen w-full overflow-x-hidden font-[sans-serif] font-light flex flex-col">
      <BackgroundDecoration />
      <Header />
      <main className="relative z-10 pt-16 md:pt-20 flex-grow flex flex-col">
        <div className="py-6 md:py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-light text-stone-800 mb-2 inline-block border-b-2 border-red-700 pb-1">
            Lamjung District: Hydropower Impact
          </h1>
          <p className="text-sm md:text-base text-stone-600 mt-3 md:mt-4 max-w-3xl mx-auto px-4">
            Interactive map showing household data and district boundary for Lamjung, Nepal.
          </p>
        </div>

        <div className="flex-grow container mx-auto px-2 sm:px-4 mb-8 flex flex-col md:flex-row gap-4 md:gap-6 h-[calc(100vh-220px)] md:h-[calc(100vh-240px)] max-h-[700px] md:max-h-none">
          {/* Left Column: Map - Made smaller to give more space to charts */}
          <div className="w-full md:w-1/2 lg:w-1/2 h-full rounded-lg shadow-md overflow-hidden border border-stone-200">
            <MapContainer
              ref={mapRef}
              center={lamjungMapCenter}
              zoom={initialZoom}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
              maxBounds={lamjungBounds}
              minZoom={9}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" // CartoDB Voyager - subtle with roads, rivers, forests
              />
              {/* Test GeoJSON - render first district to see if GeoJSON works at all */}
              {testGeoJson && (
                <GeoJSON
                  key={`test-${JSON.stringify(testGeoJson)}`}
                  data={testGeoJson}
                  style={testGeoJsonStyle}
                />
              )}
              {lamjungGeoJson && (
                <GeoJSON
                  key={JSON.stringify(lamjungGeoJson)}
                  data={lamjungGeoJson}
                  style={geoJsonStyle}
                  onEachFeature={(feature, layer) => {
                    // Optional: add a popup to the boundary itself
                    // layer.bindPopup(`<strong>${feature.properties.DISTRICT || feature.properties.DIST_EN}</strong>`);
                  }}
                />
              )}
              {households.map(household => (
                <Marker
                  key={household.id}
                  position={household.position}
                >
                  <Popup minWidth={280} maxHeight={300}>
                    <div className="p-1 space-y-1.5 text-sm">
                      <h3 className="text-base font-semibold text-stone-800 mb-1.5">{household.name}</h3>
                      <p><strong>Total Members:</strong> {household.interviews}</p>
                      {household.interviewLink !== '#' && (
                        <p>
                          <strong>Interview Transcripts:</strong>
                          <a href={household.interviewLink} target="_blank" rel="noopener noreferrer" className="ml-1 text-indigo-600 hover:text-indigo-800 underline">
                            Read Transcripts
                          </a>
                        </p>
                      )}
                      <p><strong>Caste:</strong> {household.caste}</p>
                      <p><strong>Source of Income:</strong> {household.sourceOfIncome}</p>
                      <p><strong>Displaced by Project:</strong> <span className={household.displaced === 'Yes' ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>{household.displaced}</span></p>
                      <p><strong>Satisfied with Project:</strong> <span className={household.agree === 'Yes' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{household.agree}</span></p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {/* District name label */}
              {lamjungCenter && (
                <Marker
                  position={lamjungCenter}
                  icon={L.divIcon({
                    className: 'district-label',
                    html: '<div style="padding: 4px 8px; font-weight: bold; font-size: 16px; color: #333;">Lamjung</div>',
                    iconSize: [80, 30],
                    iconAnchor: [40, 15]
                  })}
                />
              )}
            </MapContainer>
          </div>

          {/* Right Column: Data Panel - Now has more space */}
          <div className="w-full md:w-1/2 lg:w-1/2 bg-white rounded-lg shadow-md border border-stone-200 overflow-y-auto h-full">
            <OverallStatsView data={households} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}; 