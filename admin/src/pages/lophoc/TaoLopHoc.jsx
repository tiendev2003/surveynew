import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../../component/email/Wrapper';
import Layout from '../../component/home/Layout';
import { fetchKhoas } from '../../features/khoa/khoaSlice';
import { createLophoc } from '../../features/lop/lophocSlice';

const TaoLopHoc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { khoas } = useSelector((state) => state.khoas);
  const [lopHocData, setLopHocData] = useState({
    name: '',
    department_id: '',
  });

  useEffect(() => {
    dispatch(fetchKhoas());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLopHocData({ ...lopHocData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createLophoc(lopHocData)).unwrap();
      toast.success('Class created successfully!');
      navigate('/admin/classes');
    } catch (error) {
       toast.error( error.response.data.message || 'Failed to create class');
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4">Tạo Lớp Học</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Tên Lớp Học</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={lopHocData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Khoa</label>
                  <select
                    className="form-control"
                    name="department_id"
                    value={lopHocData.department_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn Khoa</option>
                    {khoas.map((khoa) => (
                      <option key={khoa.id} value={khoa.id}>
                        {khoa.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Tạo Lớp Học</button>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default TaoLopHoc;