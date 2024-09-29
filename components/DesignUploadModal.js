import './DesignUploadModal.css';
import Image from 'next/image';

const DesignUploadModal = ({ isOpen, onRequestClose, onImageSelect, images }) => {
  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageSelect(imageUrl);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select or Upload an Image</h2>
        
        <div className="image-list">
        {images.map((image, index) => (
            <Image
                key={index}
                src={image}
                alt={`img${index + 1}`}
                className="image-item"
                onClick={() => onImageSelect(image)}
                width={500}  // Set appropriate width
                height={500} // Set appropriate height
            />
        ))}
        </div>

        <div className="upload-section">
          <input
            id="file-upload"
            type="file"
            className="file-upload"
            onChange={handleFileUpload}
          />
        </div>

        <button onClick={onRequestClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default DesignUploadModal;
