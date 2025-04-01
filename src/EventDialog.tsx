import React, { useState } from 'react';

interface EventDialogProps {
  onSave: (eventData: EventData) => void;
  onCancel: () => void;
  initialData?: EventData;
}

interface EventData {
  title: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isFullDay: boolean;
  frequency: string;
  untilDate: string;
}

const EventDialog: React.FC<EventDialogProps> = ({ onSave, onCancel, initialData }) => {
  const [eventData, setEventData] = useState<EventData>(initialData || {
    title: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    isFullDay: false,
    frequency: 'Daily',
    untilDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';

    setEventData({
      ...eventData,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(eventData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 h-screen w-screen">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="p-6">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Daily event"
            />
          </div>

          {/* Date and Time Section */}
          <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Start date</label>
              <input
                type="date"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">&nbsp;</label>
              <input
                type="time"
                name="startTime"
                value={eventData.startTime}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-end pb-2">
              <span className="mx-2">until</span>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">End date</label>
              <input
                type="date"
                name="endDate"
                value={eventData.endDate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">&nbsp;</label>
              <input
                type="time"
                name="endTime"
                value={eventData.endTime}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Full-day event */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFullDay"
                checked={eventData.isFullDay}
                onChange={handleChange}
                className="mr-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-600">Full-day event</span>
            </label>
          </div>

          {/* Frequency */}
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Frequency</label>
              <select
                name="frequency"
                value={eventData.frequency}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Until</label>
              <input
                type="date"
                name="untilDate"
                value={eventData.untilDate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded border hover:bg-gray-50"
              style={{ backgroundColor: '#F1F3F4', color: '#000' }}
            > 
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded hover:bg-purple-700"
              style={{ backgroundColor: '#9B30FF', color: '#fff' }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventDialog;