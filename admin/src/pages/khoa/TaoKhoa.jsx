import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../../component/email/Wrapper';
import Layout from '../../component/home/Layout';
import { createKhoa } from '../../features/khoa/khoaSlice';

const TaoKhoa = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [khoaData, setKhoaData] = useState({
    name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKhoaData({ ...khoaData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createKhoa(khoaData)).unwrap();
      toast.success('Department created successfully!');
      navigate('/admin/department');
    } catch (error) {
      toast.error('Failed to create department.');
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4">Tạo Khoa</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên Khoa</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={khoaData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Tạo Khoa</button>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default TaoKhoa;