"use client";
import Table from '../../components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt, faImage, faTshirt, faGear } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="flex min-h-screen h-full">
      {/* Sidebar */}
      <div className="w-20 bg-black text-white flex flex-col justify-between items-center py-8 h-screen p-4">
        {/* Sidebar icons in flex-col */}
        <div className="flex flex-col items-center space-y-8 flex-grow gap-6">
          <FontAwesomeIcon icon={faHome} size="2x" className="text-white" />
          <FontAwesomeIcon icon={faBolt} size="2x" className="text-white" />
          <FontAwesomeIcon icon={faImage} size="2x" className="text-white" />
          <FontAwesomeIcon icon={faTshirt} size="2x" className="text-white" />
          <FontAwesomeIcon icon={faGear} size="2x" className="text-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4 w-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{color: 'black'}}>Assignment</h1>
          </div>
          <button className="py-2 px-4 rounded-lg shadow-md bg-green-200">
          <div className="text-sm font-bold" style={{color: 'black'}}>Publish Feed</div>
          </button>
        </div>

        {/* Table Component */}
        <div className="w-full">
          <Table />
        </div>
      </div>
    </div>
  );
}
