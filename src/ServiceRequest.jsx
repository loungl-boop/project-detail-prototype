import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function ServiceRequest() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3);
  const [selectedService, setSelectedService] = useState('');
  const [selectedApplicant, setSelectedApplicant] = useState('');
  const [patientInfo, setPatientInfo] = useState({ name: '', age: '', gender: '' });
  const [patientMedicalRecord, setPatientMedicalRecord] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('project-benefit');
  const [selectedBenefit, setSelectedBenefit] = useState('');
  const [customerSource, setCustomerSource] = useState('');
  const [notes, setNotes] = useState('AZ-南皮医院');
  const [medicalAssistant, setMedicalAssistant] = useState('');
  const [orderAmount, setOrderAmount] = useState(3000);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);

  // 模拟权益数据
  const benefitOptions = [
    {
      id: '1',
      name: 'AZ-南皮医院-大病会诊-az-大病会诊',
      project: '健康南皮',
      totalQuantity: 4,
      remainingQuantity: 3,
      departmentLimit: {
        total: 4,
        remaining: 3
      }
    },
    {
      id: '2',
      name: 'BJ-北京医院-远程门诊-bj-远程门诊',
      project: '健康北京',
      totalQuantity: 10,
      remainingQuantity: 8,
      departmentLimit: {
        total: 10,
        remaining: 8
      }
    },
    {
      id: '3',
      name: 'SH-上海医院-专家案例教学-sh-专家案例',
      project: '健康上海',
      totalQuantity: 6,
      remainingQuantity: 4,
      departmentLimit: {
        total: 6,
        remaining: 4
      }
    },
    {
      id: '4',
      name: 'GZ-广州医院-慢病管理-gz-慢病管理',
      project: '健康广州',
      totalQuantity: 8,
      remainingQuantity: 5,
      departmentLimit: {
        total: 8,
        remaining: 5
      }
    }
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // 这里可以添加提交逻辑
    alert('服务申请提交成功！');
    navigate('/');
  };

  const handleBenefitChange = (e) => {
    setSelectedBenefit(e.target.value);
  };

  // 获取当前选中的权益信息
  const currentBenefit = benefitOptions.find(benefit => benefit.id === selectedBenefit);

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
                  <Link to="/service-request" className="flex items-center gap-2 p-2 rounded-md bg-blue-50 text-blue-600 whitespace-nowrap">
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
                  <Link to="/consultation-order" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>会诊工单</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="flex-1 flex flex-col">
        {/* 顶部导航 */}
        <div className="bg-white border-b border-gray-200 py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <button className="text-gray-500">☰</button>
              <div className="text-sm text-gray-600">
                工作台 &gt; 添加服务单
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📍</span>
                <span className="text-sm text-gray-600">杨小龙</span>
              </div>
            </div>
          </div>
        </div>

        {/* 页面内容 */}
        <div className="flex-1 p-6 overflow-auto">
          {/* 服务类型选择 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-pointer hover:border-blue-500" onClick={() => setIsDrawerOpen(true)}>
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏥</div>
                  <div className="font-medium text-gray-900">会诊</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-pointer hover:border-blue-500">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏠</div>
                  <div className="font-medium text-gray-900">诊所服务</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-pointer hover:border-blue-500">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-4xl mb-2">📞</div>
                  <div className="font-medium text-gray-900">电话咨询</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 cursor-pointer hover:border-blue-500">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-4xl mb-2">🩺</div>
                  <div className="font-medium text-gray-900">慢病管理</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧抽屉弹窗 - 创建工单 */}
        {isDrawerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute top-0 right-0 h-full w-3/4 max-w-3xl bg-white shadow-lg">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-900">创建工单</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsDrawerOpen(false)}>
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto h-[calc(100%-64px)]">
                {/* 步骤指示器 */}
                <div className="flex justify-between mb-6">
                  <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-500' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= 1 ? 'bg-blue-100 border border-blue-500' : 'bg-gray-100 border border-gray-300'}`}>
                      1
                    </div>
                    <span className="text-sm">申请信息</span>
                  </div>
                  <div className={`flex-1 mx-4 ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'} h-1 rounded-full`}></div>
                  <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-500' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= 2 ? 'bg-blue-100 border border-blue-500' : 'bg-gray-100 border border-gray-300'}`}>
                      2
                    </div>
                    <span className="text-sm">患者病历</span>
                  </div>
                  <div className={`flex-1 mx-4 ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'} h-1 rounded-full`}></div>
                  <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-500' : 'text-gray-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep >= 3 ? 'bg-blue-100 border border-blue-500' : 'bg-gray-100 border border-gray-300'}`}>
                      3
                    </div>
                    <span className="text-sm">费用支付</span>
                  </div>
                </div>

                {/* 步骤内容 */}
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">申请信息</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">申请人</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={selectedApplicant}
                          onChange={(e) => setSelectedApplicant(e.target.value)}
                        >
                          <option value="">请选择申请人</option>
                          <option value="张三">张三</option>
                          <option value="李四">李四</option>
                          <option value="王五">王五</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">申请服务</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                        >
                          <option value="">请选择服务</option>
                          <option value="专家案例教学">专家案例教学</option>
                          <option value="大病会诊">大病会诊</option>
                          <option value="远程门诊">远程门诊</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">患者病历</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">患者姓名</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={patientInfo.name}
                          onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
                          <input 
                            type="number" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={patientInfo.age}
                            onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">性别</label>
                          <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={patientInfo.gender}
                            onChange={(e) => setPatientInfo({ ...patientInfo, gender: e.target.value })}
                          >
                            <option value="">请选择性别</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">患者病历</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                          value={patientMedicalRecord}
                          onChange={(e) => setPatientMedicalRecord(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">费用支付</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">订单金额</label>
                        <div className="flex items-center gap-2">
                          <button className="px-2 py-1 border border-gray-300 rounded-md" onClick={() => setOrderAmount(Math.max(0, orderAmount - 100))}>-</button>
                          <input 
                            type="number" 
                            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                            value={orderAmount}
                            onChange={(e) => setOrderAmount(parseInt(e.target.value) || 0)}
                          />
                          <span className="text-gray-700">元</span>
                          <button className="px-2 py-1 border border-gray-300 rounded-md" onClick={() => setOrderAmount(orderAmount + 100)}>+</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">支付方式</label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="project-benefit" 
                              checked={paymentMethod === 'project-benefit'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-blue-500"
                            />
                            <label className="text-sm text-gray-700">项目权益抵扣</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="self-pay" 
                              checked={paymentMethod === 'self-pay'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-blue-500"
                            />
                            <label className="text-sm text-gray-700">自费</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="member-card" 
                              checked={paymentMethod === 'member-card'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-blue-500"
                            />
                            <label className="text-sm text-gray-700">会员卡-扣费</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="paymentMethod" 
                              value="member-benefit" 
                              checked={paymentMethod === 'member-benefit'}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="text-blue-500"
                            />
                            <label className="text-sm text-gray-700">会员卡-权益抵扣</label>
                          </div>
                        </div>
                      </div>
                      {paymentMethod === 'project-benefit' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">权益 <span className="text-red-500">*</span></label>
                          {!currentBenefit ? (
                            <button 
                              className="w-full px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
                              onClick={() => setIsBenefitModalOpen(true)}
                            >
                              选择项目权益
                            </button>
                          ) : (
                            <div>
                              <div className="border border-gray-200 rounded-md p-4">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium text-gray-900">{currentBenefit.project}</h4>
                                  <span className="px-2 py-1 bg-green-100 text-green-500 rounded-full text-xs">进行中</span>
                                </div>
                                <div className="mt-2 grid grid-cols-2 gap-4">
                                  <div>
                                    <div className="text-sm text-gray-500">会诊数量</div>
                                    <div className="text-sm font-medium text-gray-900">剩余{currentBenefit.remainingQuantity}/{currentBenefit.totalQuantity}次</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">会诊科室数量</div>
                                    <div className="text-sm font-medium text-gray-900">剩余{currentBenefit.departmentLimit.remaining}/{currentBenefit.departmentLimit.total}次</div>
                                  </div>
                                </div>
                              </div>
                              <button 
                                className="w-full mt-2 px-3 py-2 border border-blue-500 text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-50"
                                onClick={() => setIsBenefitModalOpen(true)}
                              >
                                修改项目权益
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">客户来源</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={customerSource}
                          onChange={(e) => setCustomerSource(e.target.value)}
                          placeholder="客户来源"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">医助</label>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={medicalAssistant}
                          onChange={(e) => setMedicalAssistant(e.target.value)}
                        >
                          <option value="">请选择</option>
                          <option value="医助1">医助1</option>
                          <option value="医助2">医助2</option>
                          <option value="医助3">医助3</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 按钮区域 */}
                <div className="mt-6 flex justify-end gap-2">
                  {currentStep < 3 && (
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                      onClick={handleNextStep}
                    >
                      下一步
                    </button>
                  )}
                  {currentStep === 3 && (
                    <button 
                      className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                      onClick={handleSubmit}
                    >
                      提交
                    </button>
                  )}
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 选择项目权益弹窗 */}
        {isBenefitModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-900">选择项目权益</h3>
                <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsBenefitModalOpen(false)}>
                  ×
                </button>
              </div>
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                  {benefitOptions.map(benefit => (
                    <div key={benefit.id} className="border border-gray-200 rounded-md p-4 hover:border-blue-500 cursor-pointer" onClick={() => {
                      setSelectedBenefit(benefit.id);
                      setIsBenefitModalOpen(false);
                    }}>
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">{benefit.project}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-500 rounded-full text-xs">进行中</span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">会诊数量</div>
                          <div className="text-sm font-medium text-gray-900">剩余{benefit.remainingQuantity}/{benefit.totalQuantity}次</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">会诊科室数量</div>
                          <div className="text-sm font-medium text-gray-900">剩余{benefit.departmentLimit.remaining}/{benefit.departmentLimit.total}次</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex justify-end">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsBenefitModalOpen(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceRequest;