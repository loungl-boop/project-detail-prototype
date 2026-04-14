import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ConsultationOrder() {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  
  // 科室数据，包含剩余数量信息
  const departments = [
    { value: '精神心理科', label: '精神心理科', remaining: 3, total: 4 },
    { value: '心内科', label: '心内科', remaining: 0, total: 5 },
    { value: '神经内科', label: '神经内科', remaining: 2, total: 3 },
    { value: '呼吸内科', label: '呼吸内科', remaining: 5, total: 5 }
  ];
  
  // 表单数据状态
  const [formData, setFormData] = useState({
    emergencyContact: '',
    applicant: '测试杨 | 患 189****0037',
    doctorName: '-',
    doctorPhone: '-',
    hospital: '-',
    doctorDepartment: '-',
    consultationDepartment: '精神心理科',
    consultationPurpose: '1',
    diagnosis: '1',
    chiefComplaint: '1',
    presentIllness: '-',
    pastIllness: '-'
  });
  
  // 当前选择的科室信息
  const [selectedDepartment, setSelectedDepartment] = useState(departments.find(dept => dept.value === formData.consultationDepartment));
  
  // 错误信息
  const [errorMessage, setErrorMessage] = useState('');
  
  // 分诊弹窗状态
  const [isTriageModalOpen, setIsTriageModalOpen] = useState(false);
  
  // 分诊表单数据
  const [triageForm, setTriageForm] = useState({
    consultationDepartment: formData.consultationDepartment,
    expert: '',
    date: '',
    time: ''
  });
  
  // 专家数据，包含剩余数量信息
  const experts = [
    { value: '', label: '请选择专家', remaining: 0, total: 0 },
    { value: 'expert1', label: '张教授 - 精神心理科', remaining: 1, total: 4 },
    { value: 'expert2', label: '李医生 - 精神心理科', remaining: 2, total: 3 },
    { value: 'expert3', label: '王主任 - 精神心理科', remaining: 0, total: 2 }
  ];
  
  // 处理分诊按钮点击
  const handleTriage = () => {
    setIsTriageModalOpen(true);
  };
  
  // 处理分诊表单数据变化
  const handleTriageInputChange = (e) => {
    const { name, value } = e.target;
    setTriageForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 处理分诊提交
  const handleTriageSubmit = () => {
    // 校验会诊科室剩余数量
    const selectedDept = departments.find(dept => dept.value === triageForm.consultationDepartment);
    if (selectedDept && selectedDept.remaining === 0) {
      alert('会诊科室无剩余数量，不可提交');
      return;
    }
    
    // 校验专家剩余数量
    const selectedExpert = experts.find(expert => expert.value === triageForm.expert);
    if (selectedExpert && selectedExpert.remaining === 0) {
      alert('该专家无剩余数量，不可提交');
      return;
    }
    
    // 这里可以添加分诊逻辑
    setIsTriageModalOpen(false);
  };
  
  // 处理分诊取消
  const handleTriageCancel = () => {
    setIsTriageModalOpen(false);
  };
  
  // 处理表单数据变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 如果是选择会诊科室，更新选中的科室信息
    if (name === 'consultationDepartment') {
      const dept = departments.find(dept => dept.value === value);
      setSelectedDepartment(dept);
      setErrorMessage(''); // 清除之前的错误信息
    }
  };
  
  // 处理编辑病历按钮点击
  const handleEditMedicalRecord = () => {
    setIsEditMode(true);
  };
  
  // 处理保存按钮点击
  const handleSave = () => {
    // 校验会诊科室剩余数量
    if (selectedDepartment && selectedDepartment.remaining === 0) {
      setErrorMessage('会诊科室无剩余数量，不可提交');
      return;
    }
    
    // 这里可以添加保存逻辑
    setIsEditMode(false);
    setErrorMessage('');
  };
  
  // 处理取消按钮点击
  const handleCancel = () => {
    setIsEditMode(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 左侧菜单栏 */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* 顶部Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">尤</div>
            <span className="font-semibold text-gray-900">尤迈会诊</span>
          </div>
        </div>
        
        {/* 菜单 */}
        <div className="flex-1 p-4">
          <ul className="space-y-2">
            <li className="space-y-1">
              <Link to="/" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>工作台</span>
              </Link>
              <ul className="pl-6 space-y-1">
                <li>
                  <Link to="/service-request" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>添加服务单</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="space-y-1">
              <Link to="/" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>项目中心</span>
              </Link>
              <ul className="pl-6 space-y-1">
                <li>
                  <Link to="/" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>项目管理</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>已归档项目</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="space-y-1">
              <Link to="/consultation-order" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>工单管理</span>
              </Link>
              <ul className="pl-6 space-y-1">
                <li>
                  <Link to="/consultation-order" className="flex items-center gap-2 p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 whitespace-nowrap">
                    <span>会诊工单</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* 右侧内容 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航 */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              工单管理
            </a>
            <span className="text-gray-400">/</span>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              会诊工单
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">会诊详情</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              🔍
            </button>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">产品杨小龙</span>
              <span className="text-gray-400">▼</span>
            </div>
          </div>
        </div>

        {/* 页面内容 */}
        <div className="flex-1 p-6 overflow-auto">
          {/* 工单头部 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  ← 返回
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-medium text-gray-900">HZ0409115122160523350</span>
                  <span className="px-2 py-1 bg-orange-100 text-orange-500 rounded-full text-xs">待分诊</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">AZ-南皮医院</span>
                <span className="text-sm text-gray-500">创建于 2026-04-09 11:51:22</span>
              </div>
            </div>
          </div>

          {/* 工单详情 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">测试杨的病历</h3>
              <div className="flex items-center gap-2">
                {!isEditMode ? (
                  <>
                    <button 
                      className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                      onClick={handleTriage}
                    >
                      分诊
                    </button>
                    <button 
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                      onClick={handleEditMedicalRecord}
                    >
                      编辑病历
                    </button>
                    <select className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600">
                      <option value="">请选择</option>
                    </select>
                  </>
                ) : (
                  <>
                    <button 
                      className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                      onClick={handleSave}
                    >
                      保存
                    </button>
                    <button 
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                      onClick={handleCancel}
                    >
                      取消
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 患者基本信息 */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-900 font-medium">测试杨</span>
                <span className="text-gray-600">男</span>
                <span className="text-gray-600">汉族</span>
                <span className="text-gray-600">22</span>
                <span className="text-gray-600">188cm</span>
                <span className="text-gray-600">88kg</span>
                <span className="text-gray-600">111****4456</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">紧急联系人</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">申请人</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="applicant"
                    value={formData.applicant}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>

            {/* 临床医生 */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                临床医生
              </h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">医生姓名</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">联系电话</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="doctorPhone"
                    value={formData.doctorPhone}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">所属医院</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">医生科室</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="doctorDepartment"
                    value={formData.doctorDepartment}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>

            {/* 申请信息 */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                申请信息
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">拟申请会诊科室</label>
                  {isEditMode ? (
                    <>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        name="consultationDepartment"
                        value={formData.consultationDepartment}
                        onChange={handleInputChange}
                      >
                        {departments.map(dept => (
                          <option key={dept.value} value={dept.value}>
                            {dept.label} {dept.remaining === 0 && '(无剩余数量)'}
                          </option>
                        ))}
                      </select>
                      {selectedDepartment && (
                        <div className="mt-1 text-sm text-gray-600">
                          该科室剩余会诊数量：{selectedDepartment.remaining}/{selectedDepartment.total}次
                        </div>
                      )}
                    </>
                  ) : (
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" 
                      value={formData.consultationDepartment}
                      disabled
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">会诊目的</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="consultationPurpose"
                    value={formData.consultationPurpose}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
              {errorMessage && (
                <div className="mt-2 text-sm text-red-500">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* 患者病历 */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                患者病历
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">诊断</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="diagnosis"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">主诉</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="chiefComplaint"
                    value={formData.chiefComplaint}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">现病史</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="presentIllness"
                    value={formData.presentIllness}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">既往史</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                    name="pastIllness"
                    value={formData.pastIllness}
                    onChange={handleInputChange}
                    disabled={!isEditMode}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 分诊弹窗 */}
      {isTriageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">分诊</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={handleTriageCancel}>
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">会诊科室 <span className="text-red-500">*</span></label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    name="consultationDepartment"
                    value={triageForm.consultationDepartment}
                    onChange={handleTriageInputChange}
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label} {dept.remaining === 0 && '(无剩余数量)'}
                      </option>
                    ))}
                  </select>
                  {triageForm.consultationDepartment && (
                    <div className="mt-1 text-sm text-gray-600">
                      该科室剩余会诊数量：{departments.find(dept => dept.value === triageForm.consultationDepartment)?.remaining}/{departments.find(dept => dept.value === triageForm.consultationDepartment)?.total}次
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">会诊专家 <span className="text-red-500">*</span></label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    name="expert"
                    value={triageForm.expert}
                    onChange={handleTriageInputChange}
                  >
                    {experts.map(expert => (
                      <option key={expert.value} value={expert.value}>
                        {expert.label}
                      </option>
                    ))}
                  </select>
                  {triageForm.expert && (
                    <div className="mt-1 text-sm text-gray-600">
                      该项目该专家剩余会诊数量：{experts.find(expert => expert.value === triageForm.expert)?.remaining}/{experts.find(expert => expert.value === triageForm.expert)?.total}次
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">会诊日期 <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      name="date"
                      value={triageForm.date}
                      onChange={handleTriageInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">会诊时间 <span className="text-red-500">*</span></label>
                    <input 
                      type="time" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      name="time"
                      value={triageForm.time}
                      onChange={handleTriageInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                onClick={handleTriageCancel}
              >
                取消
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                onClick={handleTriageSubmit}
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultationOrder;