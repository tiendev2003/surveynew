
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../../component/email/Wrapper';
import Layout from '../../component/home/Layout';
import { fetchKhoaById, updateKhoa } from '../../features/khoa/khoaSlice';

const SuaKhoa = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { khoa } = useSelector((state) => state.khoas);
  const [khoaData, setKhoaData] = useState({
    name: '',
  });

  useEffect(() => {
    dispatch(fetchKhoaById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (khoa) {
      setKhoaData({ name: khoa.name });
    }
  }, [khoa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKhoaData({ ...khoaData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateKhoa({ id, ...khoaData })).unwrap();
      toast.success('Department updated successfully!');
      navigate('/admin/department');
    } catch (error) {
      toast.error('Failed to update department.');
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4">Sửa Khoa</h1>
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
                <button type="submit" className="btn btn-primary">Cập Nhật Khoa</button>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default SuaKhoa;