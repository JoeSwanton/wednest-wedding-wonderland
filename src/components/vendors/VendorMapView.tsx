
import { MapPin } from "lucide-react";

const VendorMapView = () => {
  return (
    <div className="bg-gray-100 h-[500px] rounded-lg flex items-center justify-center">
      <div className="text-center p-6">
        <MapPin className="h-12 w-12 text-wednest-sage mx-auto mb-2" />
        <h3 className="text-xl font-medium text-wednest-brown mb-2">Map View</h3>
        <p className="text-wednest-brown-light">
          Map view is coming soon. This will show vendors based on their geographic location.
        </p>
      </div>
    </div>
  );
};

export default VendorMapView;
