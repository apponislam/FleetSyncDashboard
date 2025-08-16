import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { BsArrowDown, BsArrowUp, BsPlus, BsTrash, BsCheck } from "react-icons/bs";

const EditableListTrucks = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const moveItem = (from, to) => {
    if (to < 0 || to >= items.length) return;
    const updated = [...items];
    [updated[from], updated[to]] = [updated[to], updated[from]];
    setItems(updated);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(items[index]);
  };

  const saveEdit = (index) => {
    if (!editValue.trim()) return;
    const updated = [...items];
    updated[index] = editValue.trim();
    setItems(updated);
    setEditingIndex(null);
    setEditValue("");
  };

  const deleteItem = (index) => setItems(items.filter((_, i) => i !== index));

  const addItem = () => setItems([...items, `Truck ${items.length + 1}`]);

  return (
    <div className="p-6 shadow-md bg-white rounded-xl w-full">
      <h2 className="text-xl font-semibold mb-5 border-b pb-2 text-gray-800">
        Promotion Trucks
      </h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2 shadow-sm">
            {editingIndex === index ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1 mr-3 focus:outline-none focus:ring focus:ring-green-300"
              />
            ) : (
              <span className="flex-1 text-gray-700 font-medium">{item}</span>
            )}
            <div className="flex gap-2">
              {editingIndex === index ? (
                <button onClick={() => saveEdit(index)} className="p-1 text-green-600 hover:bg-green-100 rounded">
                  <BsCheck size={18} />
                </button>
              ) : (
                <button onClick={() => startEdit(index)} className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                  <BiPencil size={18} />
                </button>
              )}
              <button onClick={() => moveItem(index, index - 1)} disabled={index === 0} className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30">
                <BsArrowUp size={18} />
              </button>
              <button onClick={() => moveItem(index, index + 1)} disabled={index === items.length - 1} className="p-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-30">
                <BsArrowDown size={18} />
              </button>
              <button onClick={() => deleteItem(index)} className="p-1 text-red-600 hover:bg-red-100 rounded">
                <BsTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addItem} className="mt-6 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition">
        <BsPlus size={18} /> Add
      </button>
    </div>
  );
};

export default EditableListTrucks;
