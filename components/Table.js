import React, { useState, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faGripVertical, faEllipsisV, faPen } from '@fortawesome/free-solid-svg-icons';
import DesignUploadModal from './DesignUploadModal';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';

const ROW_TYPE = 'row';
const VARIANT_TYPE = 'variant';

const DraggableRow = ({ row, index, moveRow, deleteRow, children, addVariantColumn }) => {
  const [, ref] = useDrag({
    type: ROW_TYPE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ROW_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="flex mb-4 border border-gray-300 rounded-lg bg-white shadow-md relative"
    >
      <div
        className="flex items-center gap-6 p-4 bg-white border-r border-gray-200 flex-shrink-0"
        style={{ width: '40%', position: 'sticky', left: 0, zIndex: 10 }}
      >
        <div className="flex flex-col justify-center items-center group">
          <div className="flex items-center mb-2 gap-2">
            <span className="font-bold text-xl text-gray-700">{index + 1}</span>
            <FontAwesomeIcon icon={faGripVertical} className="text-gray-500 mr-2" />
          </div>

          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteRow(index)}
            className="mt-2 text-red-500 cursor-pointer hidden group-hover:block"
          />
        </div>

        <div className="mt-4 p-4 border-dashed border-2 border-gray-300 rounded-lg bg-gray-50">
          <div className="mb-2">
            <span className="bg-green-100 text-green-600 py-1 px-2 rounded-full text-sm mr-2">
              {row.filter}
            </span>
            <span className="bg-green-200 text-green-600 py-1 px-2 rounded-full text-sm mr-2">
              {row.condition}
            </span>
            <span className="bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-sm">
              {row.variantName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 items-center">
        {children}
        <button
          onClick={() => addVariantColumn(index)}
          className="w-12 h-12 bg-gray-100 text-gray-500 flex items-center justify-center shadow-md border border-gray-300"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};



const DraggableVariant = ({ variant, rowIndex, variantIndex, moveVariant, handleOpenDialog }) => {
  const [, ref] = useDrag({
    type: VARIANT_TYPE,
    item: { rowIndex, variantIndex },
  });

  const [, drop] = useDrop({
    accept: VARIANT_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.variantIndex !== variantIndex) {
        moveVariant(rowIndex, draggedItem.variantIndex, variantIndex);
        draggedItem.variantIndex = variantIndex;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="w-48 h-64 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4 relative flex-shrink-0 group bg-white shadow"
    >
      {variant.image ? (
        <div className="relative w-full h-full">
        <Image
          src={variant.image}
          alt={variant.title}
          layout='fill'
          objectFit='cover'
          className="rounded-md h-36"
        />
        <div className="absolute bottom-0 left-0 w-full p-1 bg-white bg-opacity-90">
          <p className="text-center text-sm text-gray-900 truncate">{variant.title}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FontAwesomeIcon
            icon={faPen}
            className="text-white bg-black p-2 rounded-full cursor-pointer"
            onClick={() => handleOpenDialog(rowIndex, variantIndex)}
          />
        </div>
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-gray-400 text-sm mb-2">No Design</span>
          <button
            className="border border-gray-300 rounded-md p-2 text-sm text-gray-600"
            onClick={() => handleOpenDialog(rowIndex, variantIndex)}
          >
            + Add design
          </button>
        </div>
      )}
    </div>
  );
};

const Table = () => {
  const [rows, setRows] = useState([
    {
      id: '1',
      filter: 'Product Collection',
      condition: 'contains',
      variantName: 'Anarkali Kurtas',
      variants: [
        { id: 'v1', image: '/img1.jpg', title: 'Anniversary Sale' },
        { id: 'v2', image: '/img2.jpg', title: '2 image - zero discount' },
        { id: 'v3', image: '/img3.jpg', title: 'Multi Image - fallback' },
      ],
    },
    {
      id: '2',
      filter: 'Product Collection',
      condition: 'contains',
      variantName: 'Anarkali Kurtas',
      variants: [
        { id: 'v4', image: '/img4.jpg', title: 'Single image product' },
        { id: 'v5', image: '/img5.jpg', title: '4 image - zero discount' },
        { id: 'v6', image: '/img6.jpg', title: 'Multi Image - No Tag' },
      ],
    },
    {
      id: '3',
      filter: 'Product Collection',
      condition: 'contains',
      variantName: 'Anarkali Kurtas',
      variants: [
        { id: 'v7', image: '/img7.jpg', title: 'Single image product' },
        { id: 'v8', image: '/img8.jpg', title: '4 image - zero discount' },
        { id: 'v9', image: '/img9.jpg', title: 'Multi Image - No Tag' },
      ],
    },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVariantInfo, setCurrentVariantInfo] = useState({ rowIndex: null, variantIndex: null });

  const imageList = ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img5.jpg', '/img6.jpg']

  // Handle dialog open
  const handleOpenDialog = (rowIndex, variantIndex) => {
    setCurrentVariantInfo({ rowIndex, variantIndex });
    setModalOpen(true);
  };

  const handleImageSelect = (image) => {
    const { rowIndex, variantIndex } = currentVariantInfo;
    const updatedRows = [...rows];
    updatedRows[rowIndex].variants[variantIndex].image = image;
    updatedRows[rowIndex].variants[variantIndex].title = 'Custom Title';
    setRows(updatedRows);
    setModalOpen(false);
  };

  const scrollContainerRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const addRow = () => {
    const newRow = {
      id: `${rows.length + 1}`,
      filter: 'Product Collection',
      condition: 'contains',
      variantName: `New Variant ${rows.length + 1}`,
      variants: rows[0].variants.map(() => ({ id: `v${Date.now()}`, image: '', title: '' })),
    };
    setRows([...rows, newRow]);
    toast.success('State added');
  };

  const addVariantColumn = () => {
    const updatedRows = rows.map((row) => ({
      ...row,
      variants: [...row.variants, { id: `v${Date.now()}`, image: '', title: '' }],
    }));
    setRows(updatedRows);
    toast.success('Variant added!');
  };

  const deleteVariantColumn = (variantIndex) => {
    const updatedRows = rows.map((row) => ({
      ...row,
      variants: row.variants.filter((_, i) => i !== variantIndex),
    }));
    setRows(updatedRows);
    toast.success('Variant deleted!');
  };

  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    scrollContainerRef.current.scrollLeft = scrollLeft;
  };

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 bg-gray-50 shadow-lg rounded-lg">
        <ToastContainer position="top-center" autoClose={1000}/>

        <div className="flex flex-col bg-white rounded-lg" style={{ overflowX: 'auto' }} ref={scrollContainerRef} onScroll={handleScroll}>
          <div className="flex">
            <div className="flex items-center gap-6 p-4 bg-white border-r border-gray-200 flex-shrink-0 text-center font-bold text-gray-500" style={{ width: '40%', position: 'sticky', left: 0, zIndex: 10 }}>
              <div>
              </div>
              <div className="ml-12">
                Product Filter
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <div className="w-48 text-center font-bold text-gray-500 relative">
                <div className="flex items-center justify-between w-11/12 px-4">
                  <span>Primary Variant</span>
                  <div className="relative">
                    <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" onClick={() => toggleDropdown(0)} />
                    {dropdownOpen === 0 && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <button
                          onClick={() => deleteVariantColumn(0)}
                          className="text-red-500 block w-full px-4 py-2 text-center hover:bg-gray-100"
                        >
                          Delete Variant
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {rows[0].variants.slice(1).map((_, i) => (
                <div key={i} className="w-48 text-center font-bold text-gray-500 relative">
                  <div className="flex items-center justify-between w-11/12 px-4">
                    <span>{`Variant ${i + 2}`}</span>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" onClick={() => toggleDropdown(i + 1)} />
                      {dropdownOpen === i + 1 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          <button
                            onClick={() => deleteVariantColumn(i + 1)}
                            className="text-red-500 block w-full px-4 py-2 text-center hover:bg-gray-100"
                          >
                            Delete Variant
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            {rows.map((row, rowIndex) => (
              <DraggableRow
                key={row.id}
                index={rowIndex}
                row={row}
                moveRow={(fromIndex, toIndex) => {
                  const updatedRows = [...rows];
                  const [movedRow] = updatedRows.splice(fromIndex, 1);
                  updatedRows.splice(toIndex, 0, movedRow);
                  setRows(updatedRows);
                }}
                deleteRow={(index) => setRows(rows.filter((_, i) => i !== index))}
                addVariantColumn={addVariantColumn}
              >
                {row.variants.map((variant, variantIndex) => (
                  <DraggableVariant
                    key={variant.id}
                    variant={variant}
                    rowIndex={rowIndex}
                    variantIndex={variantIndex}
                    moveVariant={(rowIndex, fromIndex, toIndex) => {
                      const updatedRows = [...rows];
                      const updatedVariants = [...updatedRows[rowIndex].variants];
                      const [movedVariant] = updatedVariants.splice(fromIndex, 1);
                      updatedVariants.splice(toIndex, 0, movedVariant);
                      updatedRows[rowIndex].variants = updatedVariants;
                      setRows(updatedRows);
                    }}
                    handleOpenDialog={handleOpenDialog}
                  />
                ))}
              </DraggableRow>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-start">
          <button
            onClick={addRow}
            className="w-12 h-12 bg-gray-100 text-gray-500 flex items-center justify-center shadow-md border border-gray-300"
          >
            <FontAwesomeIcon icon={faPlus} color="#000" />
          </button>
        </div>
      </div>

      <DesignUploadModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        onImageSelect={handleImageSelect}
        images={imageList}
        style={{
          overlay: {
            zIndex: 9999,
          },
          content: {
            zIndex: 9999,
          },
        }}
      />
    </DndProvider>
  );
};

export default Table;
