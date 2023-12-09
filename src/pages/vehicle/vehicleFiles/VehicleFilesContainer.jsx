import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { useMessageBanner } from '../../../contexts/MessageBannerContext';
import Table from '../../../util/Table';

const VehicleFilesContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showBanner } = useMessageBanner();
  const [files, setFiles] = useState();

  /**
   * ID, LABEL, FILENAME, DATE_ADDED,
   */

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const response = await axios.get(`/api/vehicle/${id}/files`);
        setFiles(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        showBanner({ style: 'error', message: error.message });
      }
    };

    fetchDataAndSetState();
  }, [id]);

  const tableColumns = [
    { title: 'ID', value: 'id', width: 1, style: '', sort: true },
    { title: 'LABEL', value: 'label', width: 3, style: 'font-bold', sort: false },
    { title: 'CATEGORY', value: 'category', width: 3, style: '', sort: true },
    { title: 'FILE', value: 'file_name', path: 'file_path', width: 3, style: '', sort: false, download: true },
    { title: 'DATE ADDED', value: 'date_added', width: 2, style: 'truncate ', sort: true },
  ];

  if (loading) return null;
  return (
    <div className='box-white'>
      <header className='flex justify-between'>
        <h1>FILES</h1>
        <button className='btn' onClick={() => navigate('new')}>
          ADD
        </button>
      </header>
      <div className='py-4'>
        {files.length === 0 ? (
          <div>NO FILES</div>
        ) : (
          <Table columns={tableColumns} data={files} checkbox={false} filter={true} />
        )}
      </div>
    </div>
  );
};

export default VehicleFilesContainer;
