// pages/EditBookPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = "https://675c6bebfe09df667f63d7a1.mockapi.io/BOOKFLIX";

const FormInput = ({ label, type = "text", name, value, onChange, required = true, min, max, step, pattern, className = "", placeholder = "", error }) => (
  <div className="mb-3">
    <label className="form-label">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    <input
      type={type}
      className={`form-control bg-dark text-white border-secondary ${className} ${error ? 'is-invalid' : ''}`}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      step={step}
      pattern={pattern}
      placeholder={placeholder}
    />
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  const yearNum = parseInt(year);
  return !isNaN(yearNum) && yearNum > 0 && yearNum <= currentYear;
};

const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const EditBookPage = () => {
  const [formData, setFormData] = useState({
    BOOK_NM_INFO: '',
    AUTHOR_NM_INFO: '',
    PUBLSHCMPY_NM: '',
    PUBLCATN_YY: '',
    BOOK_IMAGE_URL: '',
    COMMENT: '',
    STARS: '0'
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Book not found");
        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("책을 불러오는데 실패했습니다.");
        navigate('/library');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.BOOK_NM_INFO.trim()) {
      newErrors.BOOK_NM_INFO = "책 제목을 입력해주세요.";
    }

    if (!formData.AUTHOR_NM_INFO.trim()) {
      newErrors.AUTHOR_NM_INFO = "저자를 입력해주세요.";
    }

    if (!formData.PUBLSHCMPY_NM.trim()) {
      newErrors.PUBLSHCMPY_NM = "출판사를 입력해주세요.";
    }

    if (!validateYear(formData.PUBLCATN_YY)) {
      newErrors.PUBLCATN_YY = "올바른 출판연도를 입력해주세요.";
    }

    if (!validateUrl(formData.BOOK_IMAGE_URL)) {
      newErrors.BOOK_IMAGE_URL = "올바른 URL을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          PUBLCATN_YY: formData.PUBLCATN_YY.toString(),
          STARS: formData.STARS ? Number(formData.STARS) : 0
        })
      });

      if (res.ok) {
        navigate('/library');
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      alert("책 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'PUBLCATN_YY') {
      if (value === '' || /^\d+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
      return;
    }

    if (name === 'STARS') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 5) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-vh-100 bg-black d-flex justify-content-center align-items-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">로딩 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-black text-white py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>책 정보 수정</h2>
          <button 
            className="btn btn-outline-light"
            onClick={() => navigate('/library')}
          >
            뒤로가기
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark p-4 rounded">
          <FormInput
            label="책 제목"
            name="BOOK_NM_INFO"
            value={formData.BOOK_NM_INFO}
            onChange={handleChange}
            error={errors.BOOK_NM_INFO}
          />

          <FormInput
            label="저자"
            name="AUTHOR_NM_INFO"
            value={formData.AUTHOR_NM_INFO}
            onChange={handleChange}
            error={errors.AUTHOR_NM_INFO}
          />

          <FormInput
            label="출판사"
            name="PUBLSHCMPY_NM"
            value={formData.PUBLSHCMPY_NM}
            onChange={handleChange}
            error={errors.PUBLSHCMPY_NM}
          />

          <FormInput
            label="출판연도"
            name="PUBLCATN_YY"
            value={formData.PUBLCATN_YY}
            onChange={handleChange}
            type="text"
            pattern="\d*"
            maxLength="4"
            placeholder="YYYY"
            error={errors.PUBLCATN_YY}
          />

          <FormInput
            label="이미지 URL"
            type="url"
            name="BOOK_IMAGE_URL"
            value={formData.BOOK_IMAGE_URL}
            onChange={handleChange}
            error={errors.BOOK_IMAGE_URL}
          />

          {formData.BOOK_IMAGE_URL && validateUrl(formData.BOOK_IMAGE_URL) && (
            <div className="mb-3">
              <img 
                src={formData.BOOK_IMAGE_URL} 
                alt="Book cover preview" 
                className="mt-2"
                style={{ maxHeight: '200px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  setErrors(prev => ({
                    ...prev,
                    BOOK_IMAGE_URL: "이미지를 불러올 수 없습니다."
                  }));
                }}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">코멘트</label>
            <textarea
              className="form-control bg-dark text-white border-secondary"
              name="COMMENT"
              value={formData.COMMENT}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <FormInput
            label="별점"
            type="number"
            name="STARS"
            value={formData.STARS}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.5"
            required={false}
          />

          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger">
              {Object.values(errors).map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">수정하기</button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/library')}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;