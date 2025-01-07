
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../../component/email/Wrapper';
import Layout from '../../component/home/Layout';
import { fetchKhoas } from '../../features/khoa/khoaSlice';
import { fetchLophocById, updateLophoc } from '../../features/lop/lophocSlice';
 
const SuaLopHoc = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { khoas } = useSelector((state) => state.khoas);
  const { lophoc } = useSelector((state) => state.lophocs);
  const [lopHocData, setLopHocData] = useState({
    name: '',
    department_id: '',
  });

  useEffect(() => {
    dispatch(fetchKhoas());
    dispatch(fetchLophocById(id)).then((response) => {
      setLopHocData(response.payload.data);
    });
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLopHocData({ ...lopHocData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateLophoc({ id, ...lopHocData })).unwrap();
      toast.success('Class updated successfully!');
      navigate('/admin/classes');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Failed to update class');
    }
  };

  return (
    <Layout>
      <Wrapper>
        <div className="container mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="mb-4">Sửa Lớp Học</h1>
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
                <button type="submit" className="btn btn-primary">Sửa Lớp Học</button>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default SuaLopHoc;