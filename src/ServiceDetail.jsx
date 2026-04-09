import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProjectDrawer from './EditProjectDrawer';

function ServiceDetail() {
  const navigate = useNavigate();
  const [isDepartmentLimitModalOpen, setIsDepartmentLimitModalOpen] = useState(false);
  
  // 标注浮窗状态
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [annotationTooltipPosition, setAnnotationTooltipPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDepartmentLimitClick = () => {
    setIsDepartmentLimitModalOpen(true);
  };

  const handleCloseDepartmentLimitModal = () => {
    setIsDepartmentLimitModalOpen(false);
  };

  // 编辑项目集抽屉
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  // 当前选中的服务类型
  const [activeService, setActiveService] = useState('专家案例教学');

  const handleLimitConfigClick = () => {
    setIsEditDrawerOpen(true);
  };

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false);
  };

  // 处理服务类型切换
  const handleServiceChange = (service) => {
    setActiveService(service);
  };

  // 处理远程门诊限制配置点击
  const handleRemoteClinicLimitConfigClick = () => {
    alert('非会诊类型服务，不支持服务限制配置');
  };

  // 处理限制配置点击（项目分配）
  const handleProjectLimitConfigClick = () => {
    alert('非会诊类型不支持限制配置');
  };

  // 数量分配弹窗
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  // 数量分配弹窗模式：view 或 edit
  const [quantityModalMode, setQuantityModalMode] = useState('view');

  // 组件加载时的初始化逻辑
  useEffect(() => {
    // 初始化操作
  }, []);
  // 查看限制配置弹窗
  const [isViewLimitModalOpen, setIsViewLimitModalOpen] = useState(false);
  // 查看限制配置弹窗中的当前服务类型
  const [viewLimitModalService, setViewLimitModalService] = useState('专家案例教学');
  // 修改限制配置页面
  const [isEditLimitPageOpen, setIsEditLimitPageOpen] = useState(false);
  // 修改限制配置页面中的当前服务类型
  const [editLimitPageService, setEditLimitPageService] = useState('专家案例教学');
  // 科室服务限制类型
  const [departmentLimitType, setDepartmentLimitType] = useState('不限制');
  // 专家服务限制类型
  const [expertLimitType, setExpertLimitType] = useState('仅允许指定专家');
  // 已配置科室限制列表
  const [departmentLimits, setDepartmentLimits] = useState([
    { id: 1, department: '呼吸内科', limit: 30, used: 10 },
    { id: 2, department: '骨科', limit: 20, used: 15 },
    { id: 3, department: '心内科', limit: 10, used: 10 }
  ]);
  // 已配置专家限制列表
  const [expertLimits, setExpertLimits] = useState([
    { id: 1, expert: '张三', limit: 30, used: 10 },
    { id: 2, expert: '李四', limit: 20, used: 15 },
    { id: 3, expert: '王小五', limit: 10, used: 10 }
  ]);
  // 系统标准科室列表
  const departmentList = [
    {
      id: '内科',
      name: '内科',
      children: [
        { id: '呼吸内科', name: '呼吸内科' },
        { id: '消化内科', name: '消化内科' },
        { id: '心内科', name: '心内科' },
        { id: '神经内科', name: '神经内科' },
        { id: '内分泌科', name: '内分泌科' }
      ]
    },
    {
      id: '外科',
      name: '外科',
      children: [
        { id: '骨科', name: '骨科' },
        { id: '普外科', name: '普外科' },
        { id: '神经外科', name: '神经外科' },
        { id: '心胸外科', name: '心胸外科' },
        { id: '泌尿外科', name: '泌尿外科' }
      ]
    },
    {
      id: '妇产科',
      name: '妇产科',
      children: [
        { id: '妇科', name: '妇科' },
        { id: '产科', name: '产科' }
      ]
    },
    {
      id: '儿科',
      name: '儿科',
      children: [
        { id: '小儿内科', name: '小儿内科' },
        { id: '小儿外科', name: '小儿外科' }
      ]
    }
  ];
  // 系统专家库
  const expertDatabase = [
    { id: 1, name: '张三', department: '呼吸内科', hospital: '北京协和医院' },
    { id: 2, name: '李四', department: '骨科', hospital: '北京协和医院' },
    { id: 3, name: '王小五', department: '心内科', hospital: '北京协和医院' },
    { id: 4, name: '赵六', department: '神经内科', hospital: '北京协和医院' },
    { id: 5, name: '钱七', department: '消化内科', hospital: '北京协和医院' },
    { id: 6, name: '孙八', department: '呼吸内科', hospital: '北京协和医院' },
    { id: 7, name: '周九', department: '内分泌科', hospital: '北京协和医院' },
    { id: 8, name: '吴十', department: '骨科', hospital: '北京协和医院' }
  ];
  // 专家匹配状态
  const [expertMatchResults, setExpertMatchResults] = useState([]);
  const [showExpertDropdown, setShowExpertDropdown] = useState(false);
  const [currentEditingExpertId, setCurrentEditingExpertId] = useState(null);
  // 科室搜索状态
  const [departmentSearch, setDepartmentSearch] = useState({});
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState({});
  const [departmentSearchResults, setDepartmentSearchResults] = useState({});

  // 处理数量分配点击
  const handleQuantityDistributionClick = () => {
    setIsQuantityModalOpen(true);
  };

  // 处理关闭数量分配弹窗
  const handleCloseQuantityModal = () => {
    setIsQuantityModalOpen(false);
  };

  // 处理保存数量分配
  const handleSaveQuantity = () => {
    // 这里可以添加保存逻辑
    alert('保存成功');
    setQuantityModalMode('view');
  };

  // 处理限制配置点击（项目分配中的限制配置按钮）
  const handleProjectLimitConfigClickForModal = () => {
    setIsViewLimitModalOpen(true);
  };

  // 处理关闭查看限制配置弹窗
  const handleCloseViewLimitModal = () => {
    setIsViewLimitModalOpen(false);
  };

  // 处理修改配置点击
  const handleEditLimitConfigClick = () => {
    setIsViewLimitModalOpen(false);
    setIsEditLimitPageOpen(true);
  };

  // 处理修改限制配置页面关闭
  const handleCloseEditLimitPage = () => {
    setIsEditLimitPageOpen(false);
  };

  // 处理查看限制配置弹窗中的服务类型切换
  const handleViewLimitModalServiceChange = (service) => {
    setViewLimitModalService(service);
  };

  // 处理修改限制配置页面中的服务类型切换
  const handleEditLimitPageServiceChange = (service) => {
    setEditLimitPageService(service);
  };

  // 处理添加科室
  const handleAddDepartment = () => {
    // 生成新的ID
    const newId = departmentLimits.length > 0 ? Math.max(...departmentLimits.map(item => item.id)) + 1 : 1;
    // 添加新的科室限制
    setDepartmentLimits([...departmentLimits, { id: newId, department: '', limit: 0, used: 0 }]);
  };

  // 处理删除科室
  const handleDeleteDepartment = (id) => {
    setDepartmentLimits(departmentLimits.filter(item => item.id !== id));
  };

  // 处理更新科室
  const handleUpdateDepartment = (id, field, value) => {
    setDepartmentLimits(departmentLimits.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // 处理添加专家
  const handleAddExpert = () => {
    // 生成新的ID
    const newId = expertLimits.length > 0 ? Math.max(...expertLimits.map(item => item.id)) + 1 : 1;
    // 添加新的专家限制
    setExpertLimits([...expertLimits, { id: newId, expert: '', limit: 0, used: 0 }]);
  };

  // 处理删除专家
  const handleDeleteExpert = (id) => {
    setExpertLimits(expertLimits.filter(item => item.id !== id));
  };

  // 处理更新专家
  const handleUpdateExpert = (id, field, value) => {
    setExpertLimits(expertLimits.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // 处理专家姓名输入
  const handleExpertNameInput = (id, value) => {
    setExpertLimits(expertLimits.map(item => 
      item.id === id ? { ...item, expert: value } : item
    ));
    
    // 模糊匹配系统专家库
    if (value) {
      const matches = expertDatabase.filter(expert => 
        expert.name.includes(value)
      );
      setExpertMatchResults(matches);
      setShowExpertDropdown(true);
      setCurrentEditingExpertId(id);
    } else {
      setExpertMatchResults([]);
      setShowExpertDropdown(false);
      setCurrentEditingExpertId(null);
    }
  };

  // 选择专家
  const handleSelectExpert = (id, expert) => {
    setExpertLimits(expertLimits.map(item => 
      item.id === id ? { ...item, expert: expert.name } : item
    ));
    setShowExpertDropdown(false);
    setCurrentEditingExpertId(null);
  };

  // 处理科室搜索输入
  const handleDepartmentSearchInput = (id, value) => {
    setDepartmentSearch({ ...departmentSearch, [id]: value });
    
    // 模糊搜索科室
    if (value) {
      const results = [];
      departmentList.forEach(dept => {
        dept.children.forEach(subDept => {
          if (subDept.name.includes(value)) {
            results.push({ ...subDept, parent: dept.name });
          }
        });
      });
      setDepartmentSearchResults({ ...departmentSearchResults, [id]: results });
      setShowDepartmentDropdown({ ...showDepartmentDropdown, [id]: true });
    } else {
      setDepartmentSearchResults({ ...departmentSearchResults, [id]: [] });
      setShowDepartmentDropdown({ ...showDepartmentDropdown, [id]: false });
    }
  };

  // 选择科室
  const handleSelectDepartment = (id, department) => {
    setDepartmentLimits(departmentLimits.map(item => 
      item.id === id ? { ...item, department: department.name } : item
    ));
    setShowDepartmentDropdown({ ...showDepartmentDropdown, [id]: false });
    setDepartmentSearch({ ...departmentSearch, [id]: department.name });
  };

  // 处理返回按钮点击
  const handleBackFromEditLimit = () => {
    setIsEditLimitPageOpen(false);
  };

  // 保存确认弹窗
  const [isSaveConfirmModalOpen, setIsSaveConfirmModalOpen] = useState(false);
  // 退出确认弹窗
  const [isExitConfirmModalOpen, setIsExitConfirmModalOpen] = useState(false);

  // 处理保存配置点击
  const handleSaveConfigClick = () => {
    setIsSaveConfirmModalOpen(true);
  };

  // 处理关闭保存确认弹窗
  const handleCloseSaveConfirmModal = () => {
    setIsSaveConfirmModalOpen(false);
  };

  // 处理确认保存
  const handleConfirmSave = () => {
    setIsSaveConfirmModalOpen(false);
    // 这里可以添加保存逻辑
    alert('配置已保存');
  };

  // 处理返回退出编辑模式点击
  const handleBackExitClick = () => {
    setIsExitConfirmModalOpen(true);
  };

  // 处理关闭退出确认弹窗
  const handleCloseExitConfirmModal = () => {
    setIsExitConfirmModalOpen(false);
  };

  // 处理确认退出
  const handleConfirmExit = () => {
    setIsExitConfirmModalOpen(false);
    setIsEditLimitPageOpen(false);
  };

  // 处理保存并退出
  const handleSaveAndExit = () => {
    // 这里可以添加保存逻辑
    alert('保存成功');
    setIsExitConfirmModalOpen(false);
    setIsEditLimitPageOpen(false);
  };

  // 处理标注角标悬停
  const handleAnnotationMouseEnter = (e, id) => {
    const rect = e.target.getBoundingClientRect();
    // 计算浮窗位置，默认显示在角标的左下方
    setAnnotationTooltipPosition({
      x: rect.left - 450 - 8,
      y: rect.bottom + 8
    });
    setActiveTooltip(id);
  };

  // 处理标注浮窗关闭
  const handleTooltipClose = () => {
    setActiveTooltip(null);
  };

  // 处理拖拽开始
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - annotationTooltipPosition.x,
      y: e.clientY - annotationTooltipPosition.y
    });
  };

  // 处理拖拽移动
  const handleDragMove = (e) => {
    if (isDragging) {
      setAnnotationTooltipPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    setIsDragging(false);
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
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>工作台</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>用户中心</span>
              </a>
            </li>
            <li className="space-y-1">
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>项目中心</span>
              </a>
              <ul className="pl-6 space-y-1">
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md bg-blue-50 text-blue-600 whitespace-nowrap">
                    <span>项目管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>已归档项目</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>订单管理</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>工单管理</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>审批管理</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>运营管理</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>渠道客户</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>合同管理</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>产品服务</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>财务管理</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>档案管理</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>业务中心</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>视频房间</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>任务中心</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>文件中心</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>远程门诊</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>消息中心</span>
              </a>
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
                项目中心 &gt; 项目管理 &gt; 项目集详情
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
          {/* 服务标题 */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={handleBackClick}>
                  返回
                </button>
                <h1 className="text-xl font-semibold text-gray-900">服务详情</h1>
              </div>
            </div>
          </div>

          {/* 服务标签 */}
          <div className="flex gap-2 mb-6">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${activeService === '专家案例教学' ? 'bg-blue-50 text-blue-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              onClick={() => handleServiceChange('专家案例教学')}
            >
              专家案例教学
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${activeService === '远程门诊' ? 'bg-blue-50 text-blue-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
              onClick={() => handleServiceChange('远程门诊')}
            >
              远程门诊
            </button>
          </div>

          {/* 服务统计 */}
          <div className="grid grid-cols-5 gap-4 mb-6 relative">
            {/* 标注角标 - 仅在项目集详情页显示 */}
            {!isEditLimitPageOpen && (
              <div 
                className="annotation-badge" 
                data-id="4" 
                style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1000' }}
                onMouseEnter={(e) => handleAnnotationMouseEnter(e, '4')}
              >4</div>
            )}
            {activeService === '专家案例教学' ? (
              <>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">1000</div>
                  <div className="text-sm text-gray-500 mt-1">总数量</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">800</div>
                  <div className="text-sm text-gray-500 mt-1">已分配</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">450</div>
                  <div className="text-sm text-gray-500 mt-1">已发起</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">324</div>
                  <div className="text-sm text-gray-500 mt-1">已完成</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">32.4%</div>
                  <div className="text-sm text-gray-500 mt-1">完成率</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">30</div>
                  <div className="text-sm text-gray-500 mt-1">总数量</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">25</div>
                  <div className="text-sm text-gray-500 mt-1">已分配</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">15</div>
                  <div className="text-sm text-gray-500 mt-1">已发起</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">10</div>
                  <div className="text-sm text-gray-500 mt-1">已完成</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-semibold text-gray-900">33.3%</div>
                  <div className="text-sm text-gray-500 mt-1">完成率</div>
                </div>
              </>
            )}
          </div>

          {/* 服务限制 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 relative">
            {/* 标注角标 - 仅在项目集详情页显示 */}
            {!isEditLimitPageOpen && (
              <div 
                className="annotation-badge" 
                data-id="5" 
                style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1000' }}
                onMouseEnter={(e) => handleAnnotationMouseEnter(e, '5')}
              >5</div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">服务限制</h3>
              {activeService === '专家案例教学' ? (
                <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-green-600" onClick={handleLimitConfigClick}>
                  <span>限制配置</span>
                  <span>⚙️</span>
                </button>
              ) : (
                <button className="px-3 py-1 bg-gray-300 text-gray-600 rounded-md text-sm flex items-center gap-1 cursor-not-allowed">
                  <span>限制配置</span>
                  <span>⚙️</span>
                </button>
              )}
            </div>
            {activeService === '专家案例教学' ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">专家服务数量限制</div>
                  <div className="text-gray-700">100次/人</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">患者服务次数限制</div>
                  <div className="text-gray-700">1次/人</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">科室及数量限制</div>
                  <div className="text-blue-500 cursor-pointer hover:underline" onClick={handleDepartmentLimitClick}>查看</div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">
                非会诊类型服务，不支持服务限制配置
              </div>
            )}
          </div>

          {/* 项目分配 */}
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            {/* 标注角标 - 仅在项目集详情页显示 */}
            {!isEditLimitPageOpen && (
              <div 
                className="annotation-badge" 
                data-id="6" 
                style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1000' }}
                onMouseEnter={(e) => handleAnnotationMouseEnter(e, '6')}
              >6</div>
            )}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">项目分配</h3>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-green-600" onClick={handleQuantityDistributionClick}>
                <span>数量分配</span>
                <span>📊</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-gray-500">项目名称</th>
                    <th className="py-3 px-4 font-medium text-gray-500">分配数量</th>
                    <th className="py-3 px-4 font-medium text-gray-500">已发起数量</th>
                    <th className="py-3 px-4 font-medium text-gray-500">已完成数量</th>
                    <th className="py-3 px-4 font-medium text-gray-500">完成率</th>
                    <th className="py-3 px-4 font-medium text-gray-500">科室限制</th>
                    <th className="py-3 px-4 font-medium text-gray-500">专家限制</th>
                    <th className="py-3 px-4 font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {activeService === '专家案例教学' ? (
                    <>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-700">健康察布查尔2025</td>
                        <td className="py-3 px-4 text-gray-700">250</td>
                        <td className="py-3 px-4 text-gray-700">220</td>
                        <td className="py-3 px-4 text-gray-700">200</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">80%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">不限制</td>
                        <td className="py-3 px-4 text-gray-700">不限制</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleProjectLimitConfigClickForModal}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-700">健康习水2025</td>
                        <td className="py-3 px-4 text-gray-700">200</td>
                        <td className="py-3 px-4 text-gray-700">180</td>
                        <td className="py-3 px-4 text-gray-700">150</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">75%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">仅允许指定科室</td>
                        <td className="py-3 px-4 text-gray-700">仅允许指定专家</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleProjectLimitConfigClickForModal}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-700">健康横峰2025</td>
                        <td className="py-3 px-4 text-gray-700">150</td>
                        <td className="py-3 px-4 text-gray-700">120</td>
                        <td className="py-3 px-4 text-gray-700">100</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">66%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">限制指定科室</td>
                        <td className="py-3 px-4 text-gray-700">限制指定专家</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleProjectLimitConfigClickForModal}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-700">健康范县2025</td>
                        <td className="py-3 px-4 text-gray-700">100</td>
                        <td className="py-3 px-4 text-gray-700">70</td>
                        <td className="py-3 px-4 text-gray-700">50</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">50%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">不限制</td>
                        <td className="py-3 px-4 text-gray-700">不限制</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleProjectLimitConfigClickForModal}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-700">健康台前2025</td>
                        <td className="py-3 px-4 text-gray-700">50</td>
                        <td className="py-3 px-4 text-gray-700">40</td>
                        <td className="py-3 px-4 text-gray-700">30</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">60%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">仅允许指定科室</td>
                        <td className="py-3 px-4 text-gray-700">仅允许指定专家</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleProjectLimitConfigClickForModal}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">健康吉木乃2025</td>
                        <td className="py-3 px-4 text-gray-700">50</td>
                        <td className="py-3 px-4 text-gray-700">25</td>
                        <td className="py-3 px-4 text-gray-700">20</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">40%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-700">限制指定科室</td>
                        <td className="py-3 px-4 text-gray-700">限制指定专家</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-500 hover:text-gray-700" onClick={handleProjectLimitConfigClickForModal}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 text-gray-700">健康范县2025</td>
                        <td className="py-3 px-4 text-gray-700">15</td>
                        <td className="py-3 px-4 text-gray-700">10</td>
                        <td className="py-3 px-4 text-gray-700">8</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '53%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">53%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-500">不支持配置</td>
                        <td className="py-3 px-4 text-gray-500">不支持配置</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-400 cursor-not-allowed" onClick={handleProjectLimitConfigClick}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-gray-700">健康台前2025</td>
                        <td className="py-3 px-4 text-gray-700">15</td>
                        <td className="py-3 px-4 text-gray-700">5</td>
                        <td className="py-3 px-4 text-gray-700">2</td>
                        <td className="py-3 px-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '13%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">13%</span>
                        </td>
                        <td className="py-3 px-4 text-gray-500">不支持配置</td>
                        <td className="py-3 px-4 text-gray-500">不支持配置</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-500 hover:underline">查看</button>
                            <button className="text-gray-400 cursor-not-allowed" onClick={handleProjectLimitConfigClick}>限制配置</button>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 科室限制详情弹窗 */}
      {isDepartmentLimitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">科室及数量限制</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={handleCloseDepartmentLimitModal}>
                ×
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <label className="font-medium text-gray-700">可申请会诊科室</label>
                <label className="font-medium text-gray-700">最大会诊数量限制</label>
              </div>
              
              {/* 精神科 */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked className="rounded text-blue-500" />
                  <span className="text-gray-700">精神科</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">精神科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">精神心理科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                </div>
              </div>
              
              {/* 药剂科 */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked className="rounded text-blue-500" />
                  <span className="text-gray-700">药剂科</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">药剂科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                </div>
              </div>
              
              {/* 内分泌科 */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked className="rounded text-blue-500" />
                  <span className="text-gray-700">内分泌科</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">内分泌科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                </div>
              </div>
              
              {/* 妇产科 */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked className="rounded text-blue-500" />
                  <span className="text-gray-700">妇产科</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">妇科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">产科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                </div>
              </div>
              
              {/* 临床营养科 */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked className="rounded text-blue-500" />
                  <span className="text-gray-700">临床营养科</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">临床营养科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                </div>
              </div>
              
              {/* 超声医学科 */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <input type="checkbox" checked className="rounded text-blue-500" />
                  <span className="text-gray-700">超声医学科</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked className="rounded text-blue-500" />
                      <span className="text-gray-700">超声医学科</span>
                    </div>
                    <div className="text-gray-700">1</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                取消
              </button>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm ml-2 hover:bg-green-600">
                修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑项目集抽屉 */}
      {isEditDrawerOpen && (
        <div className="fixed inset-0 z-50">
          {/* 背景遮罩 */}
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleCloseEditDrawer}></div>
          {/* 抽屉 */}
          <div className="absolute top-0 right-0 h-full w-1/3 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">编辑项目集</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={handleCloseEditDrawer}>
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto h-[calc(100%-64px)]">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  项目集名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value="同舟工程2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  备注名
                </label>
                <input
                  type="text"
                  value="中石油2025帮扶项目"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服务分配方式 <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <input type="radio" name="allocationType" checked className="text-blue-500" />
                    <label className="text-sm text-gray-700">关联合同</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input type="radio" name="allocationType" className="text-blue-500" />
                    <label className="text-sm text-gray-700">手动配置</label>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  合同名称
                </label>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                    <span className="text-gray-700">2025年中国石油医疗帮扶项目捐赠合同</span>
                    <button className="text-red-500 hover:underline text-sm">删除</button>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                    <span className="text-gray-700">2025年中国石油医疗帮扶项目捐赠合同-补充</span>
                    <button className="text-red-500 hover:underline text-sm">删除</button>
                  </div>
                  <button className="text-blue-500 hover:underline text-sm flex items-center gap-1">
                    <span>+ 添加合同</span>
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服务配置 <span className="text-red-500">*</span>
                </label>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 px-3 font-medium text-gray-500">服务包</th>
                        <th className="py-2 px-3 font-medium text-gray-500">服务</th>
                        <th className="py-2 px-3 font-medium text-gray-500">所属合同</th>
                        <th className="py-2 px-3 font-medium text-gray-500">服务数量</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 text-gray-700">重点疾病解析</td>
                        <td className="py-2 px-3 text-gray-700">重点疾病解析*1</td>
                        <td className="py-2 px-3 text-gray-700">2025年中国石油医疗帮扶项目捐赠合同</td>
                        <td className="py-2 px-3 text-gray-700">130</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 text-gray-700">专家会诊保障</td>
                        <td className="py-2 px-3 text-gray-700">专家会诊保障*1</td>
                        <td className="py-2 px-3 text-gray-700">2025年中国石油医疗帮扶项目捐赠合同</td>
                        <td className="py-2 px-3 text-gray-700">114</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 text-gray-700">科室会议</td>
                        <td className="py-2 px-3 text-gray-700">科室会议*1</td>
                        <td className="py-2 px-3 text-gray-700">2025年中国石油医疗帮扶项目捐赠合同</td>
                        <td className="py-2 px-3 text-gray-700">30</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 text-gray-700">远程案例教学</td>
                        <td className="py-2 px-3 text-gray-700">远程案例教学*1</td>
                        <td className="py-2 px-3 text-gray-700">2025年中国石油医疗帮扶项目捐赠合同</td>
                        <td className="py-2 px-3 text-gray-700">1000</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-gray-700">远程门诊</td>
                        <td className="py-2 px-3 text-gray-700">远程门诊*1</td>
                        <td className="py-2 px-3 text-gray-700">2025年中国石油医疗帮扶项目捐赠合同</td>
                        <td className="py-2 px-3 text-gray-700">200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={handleCloseEditDrawer}>
                取消
              </button>
              <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                确认
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 编辑数量分配弹窗 */}
      {isQuantityModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 relative">
            {/* 标注角标 */}
            <div 
              className="annotation-badge" 
              data-id="10" 
              style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1001' }}
              onMouseEnter={(e) => handleAnnotationMouseEnter(e, '10')}
            >10</div>
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">数量分配</h3>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm">专家案例教学</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">远程门诊</button>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">健康察布查尔2025</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">当前分配: 100</span>
                    <span className="text-gray-500">已发起: 25</span>
                    <span className="text-gray-500">已完成: 20</span>
                    {quantityModalMode === 'edit' && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">调整为:</span>
                        <input type="text" value="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">健康习水2025</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">当前分配: 100</span>
                    <span className="text-gray-500">已发起: 25</span>
                    <span className="text-gray-500">已完成: 20</span>
                    {quantityModalMode === 'edit' && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">调整为:</span>
                        <input type="text" value="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">健康横峰2025</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">当前分配: 100</span>
                    <span className="text-gray-500">已发起: 25</span>
                    <span className="text-gray-500">已完成: 20</span>
                    {quantityModalMode === 'edit' && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">调整为:</span>
                        <input type="text" value="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">健康范县2025</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">当前分配: 100</span>
                    <span className="text-gray-500">已发起: 25</span>
                    <span className="text-gray-500">已完成: 20</span>
                    {quantityModalMode === 'edit' && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">调整为:</span>
                        <input type="text" value="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">健康台前2025</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">当前分配: 100</span>
                    <span className="text-gray-500">已发起: 25</span>
                    <span className="text-gray-500">已完成: 20</span>
                    {quantityModalMode === 'edit' && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">调整为:</span>
                        <input type="text" value="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">健康吉木乃2025</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">当前分配: 100</span>
                    <span className="text-gray-500">已发起: 25</span>
                    <span className="text-gray-500">已完成: 20</span>
                    {quantityModalMode === 'edit' && (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">调整为:</span>
                        <input type="text" value="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div>
                  <span className="text-gray-500">服务总量: 1000</span>
                </div>
                <div>
                  <span className="text-green-500">累计分配: 600</span>
                </div>
                <div>
                  <span className="text-green-500">累计完成: 120</span>
                </div>
                  {quantityModalMode === 'edit' && (
                    <div>
                      <span className="text-green-500">调整后累计分配: 600</span>
                    </div>
                  )}
                </div>
              </div>
              {quantityModalMode === 'view' ? (
                <div className="flex justify-end gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={handleCloseQuantityModal}>
                    关闭
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={() => setQuantityModalMode('edit')}>
                    编辑
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={() => setQuantityModalMode('view')}>
                    取消
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={handleSaveQuantity}>
                    保存
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 查看限制配置弹窗 */}
      {isViewLimitModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/2 relative">
            {/* 标注角标 */}
            <div 
              className="annotation-badge" 
              data-id="11" 
              style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1001' }}
              onMouseEnter={(e) => handleAnnotationMouseEnter(e, '11')}
            >11</div>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">科室及专家限制</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={handleCloseViewLimitModal}>
                ×
              </button>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${viewLimitModalService === '专家案例教学' ? 'bg-blue-50 text-blue-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handleViewLimitModalServiceChange('专家案例教学')}
                >
                  专家案例教学
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${viewLimitModalService === '远程门诊' ? 'bg-blue-50 text-blue-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handleViewLimitModalServiceChange('远程门诊')}
                >
                  远程门诊
                </button>
              </div>
              
              {viewLimitModalService === '专家案例教学' ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-700 font-medium">科室服务限制</span>
                    </div>
                    {departmentLimitType === '不限制' && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="radio" name="departmentLimit" checked className="text-blue-500" />
                          <label className="text-sm text-gray-700">不限制</label>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">允许所有科室会诊，无数量上限</p>
                      </div>
                    )}
                    {departmentLimitType === '仅允许指定科室' && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="radio" name="departmentLimit" checked className="text-blue-500" />
                          <label className="text-sm text-gray-700">仅允许指定科室</label>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">选择科室设上限，其他科室完全不可用</p>
                      </div>
                    )}
                    {departmentLimitType === '限制特定科室' && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <input type="radio" name="departmentLimit" checked className="text-blue-500" />
                          <label className="text-sm text-gray-700">限制特定科室</label>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">选择科室设上限，其他科室不限数量</p>
                      </div>
                    )}
                    {(departmentLimitType === '仅允许指定科室' || departmentLimitType === '限制特定科室') && (
                      <div className="mt-4 p-2 bg-gray-50 rounded-md">
                        <div className="text-sm font-medium text-gray-700 mb-2">已配置科室限制</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">呼吸内科</span>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-500">限制数量: 30</span>
                              <span className="text-gray-500">已用: 10</span>
                              <span className="text-gray-500">剩余: 20</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">骨科</span>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-500">限制数量: 20</span>
                              <span className="text-gray-500">已用: 15</span>
                              <span className="text-gray-500">剩余: 5</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">心内科</span>
                            <div className="flex items-center gap-4">
                              <span className="text-gray-500">限制数量: 10</span>
                              <span className="text-gray-500">已用: 10</span>
                              <span className="text-gray-500">剩余: 0</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-700 font-medium">专家服务限制</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input type="radio" name="expertLimit" checked className="text-blue-500" />
                        <label className="text-sm text-gray-700">仅允许指定专家</label>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">选择专家设上限，其他专家完全不可用</p>
                    </div>
                    <div className="mt-4 p-2 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium text-gray-700 mb-2">已配置专家限制</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">张三</span>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">限制数量: 30</span>
                            <span className="text-gray-500">已用: 10</span>
                            <span className="text-gray-500">剩余: 20</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">李四</span>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">限制数量: 20</span>
                            <span className="text-gray-500">已用: 15</span>
                            <span className="text-gray-500">剩余: 5</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">王小五</span>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">限制数量: 10</span>
                            <span className="text-gray-500">已用: 10</span>
                            <span className="text-gray-500">剩余: 0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-700 font-medium">科室服务限制</span>
                    </div>
                    <div className="text-gray-500">
                      非会诊类型服务，不支持限制配置
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-700 font-medium">专家服务限制</span>
                    </div>
                    <div className="text-gray-500">
                      非会诊类型服务，不支持限制配置
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end">
                <button className="text-blue-500 hover:underline text-sm" onClick={handleEditLimitConfigClick}>
                  修改配置
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 修改限制配置页面 */}
      {isEditLimitPageOpen && (
        <div className="fixed inset-0 bg-white z-50 flex">
          {/* 确保覆盖整个页面，隐藏原始内容 */}
          <div className="absolute inset-0 bg-white z-10"></div>
          {/* 左侧菜单栏 */}
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col relative z-20">
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
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>工作台</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>用户中心</span>
                  </a>
                </li>
                <li className="space-y-1">
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>项目中心</span>
                  </a>
                  <ul className="pl-6 space-y-1">
                    <li>
                      <a href="#" className="flex items-center gap-2 p-2 rounded-md bg-blue-50 text-blue-600 whitespace-nowrap">
                        <span>项目管理</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                        <span>已归档项目</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>订单管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>工单管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>审批管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>运营管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>渠道客户</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>合同管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>产品服务</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>财务管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>档案管理</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>业务中心</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>视频房间</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>任务中心</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>文件中心</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>远程门诊</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                    <span>消息中心</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1 flex flex-col relative z-20">
            {/* 顶部导航 */}
            <div className="bg-white border-b border-gray-200 py-3 px-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button className="text-gray-500">☰</button>
                  <div className="text-sm text-gray-600">
                    项目中心 &gt; 项目管理 &gt; 项目集详情 &gt; 服务限制配置
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
            <div className="flex-1 p-6 overflow-auto relative">
              {/* 标注角标 - 修改限制配置页面 */}
              <div 
                className="annotation-badge" 
                data-id="12" 
                style={{ position: 'absolute', top: '16px', right: '16px', zIndex: '1001' }}
                onMouseEnter={(e) => handleAnnotationMouseEnter(e, '12')}
              >12</div>
              {/* 服务标题 */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={handleBackExitClick}>
                      返回
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">服务限制配置-健康康皮2025</h1>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={handleSaveConfigClick}>
                  保存配置
                </button>
              </div>

              {/* 服务标签 */}
              <div className="flex gap-2 mb-6">
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${editLimitPageService === '专家案例教学' ? 'bg-blue-50 text-blue-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handleEditLimitPageServiceChange('专家案例教学')}
                >
                  专家案例教学
                </button>
                <button 
                  className={`px-3 py-1 rounded-md text-sm ${editLimitPageService === '远程门诊' ? 'bg-blue-50 text-blue-600' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => handleEditLimitPageServiceChange('远程门诊')}
                >
                  远程门诊
                </button>
              </div>

              {editLimitPageService === '专家案例教学' ? (
                <>
                  {/* 科室服务限制 */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-700 font-medium">科室服务限制</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input 
                          type="radio" 
                          name="departmentLimit" 
                          checked={departmentLimitType === '不限制'} 
                          onChange={() => setDepartmentLimitType('不限制')}
                          className="text-blue-500" 
                        />
                        <label className="text-sm text-gray-700">不限制</label>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">允许所有科室会诊，无数量上限</p>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input 
                          type="radio" 
                          name="departmentLimit" 
                          checked={departmentLimitType === '仅允许指定科室'} 
                          onChange={() => setDepartmentLimitType('仅允许指定科室')}
                          className="text-blue-500" 
                        />
                        <label className="text-sm text-gray-700">仅允许指定科室</label>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">选择科室设上限，其他科室完全不可用</p>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input 
                          type="radio" 
                          name="departmentLimit" 
                          checked={departmentLimitType === '限制特定科室'} 
                          onChange={() => setDepartmentLimitType('限制特定科室')}
                          className="text-blue-500" 
                        />
                        <label className="text-sm text-gray-700">限制特定科室</label>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">选择科室设上限，其他科室不限数量</p>
                    </div>
                    {departmentLimitType !== '不限制' && (
                      <div className="mt-4 p-2 bg-gray-50 rounded-md">
                        <div className="text-sm font-medium text-gray-700 mb-2">已配置科室限制</div>
                        <div className="space-y-2">
                          {departmentLimits.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div className="relative">
                                <input 
                                  type="text" 
                                  value={departmentSearch[item.id] || item.department} 
                                  onChange={(e) => handleDepartmentSearchInput(item.id, e.target.value)}
                                  placeholder="请输入科室名称"
                                  className="px-2 py-1 border border-gray-300 rounded-md w-32"
                                />
                                {showDepartmentDropdown[item.id] && (
                                  <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-sm">
                                    {departmentSearchResults[item.id] && departmentSearchResults[item.id].length > 0 ? (
                                      departmentSearchResults[item.id].map((dept) => (
                                        <div 
                                          key={dept.id} 
                                          className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                          onClick={() => handleSelectDepartment(item.id, dept)}
                                          disabled={departmentLimits.some(d => d.department === dept.name && d.id !== item.id)}
                                          style={{ opacity: departmentLimits.some(d => d.department === dept.name && d.id !== item.id) ? 0.5 : 1, cursor: departmentLimits.some(d => d.department === dept.name && d.id !== item.id) ? 'not-allowed' : 'pointer' }}
                                        >
                                          {dept.name} ({dept.parent})
                                        </div>
                                      ))
                                    ) : (
                                      <div className="px-2 py-1 text-gray-500">
                                        无匹配结果
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-500">限制数量:</span>
                                  <input 
                                    type="number" 
                                    value={item.limit} 
                                    onChange={(e) => handleUpdateDepartment(item.id, 'limit', parseInt(e.target.value) || 0)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded-md" 
                                  />
                                </div>
                                <span className="text-gray-500">已用数量: {item.used}</span>
                                <button 
                                  className="text-red-500 hover:underline text-sm" 
                                  onClick={() => handleDeleteDepartment(item.id)}
                                >
                                  删除
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button 
                          className="mt-3 text-blue-500 hover:underline text-sm flex items-center gap-1"
                          onClick={handleAddDepartment}
                        >
                          <span>+ 添加科室</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 专家服务限制 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-700 font-medium">专家服务限制</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input 
                          type="radio" 
                          name="expertLimit" 
                          checked={expertLimitType === '不限制'} 
                          onChange={() => setExpertLimitType('不限制')}
                          className="text-blue-500" 
                        />
                        <label className="text-sm text-gray-700">不限制</label>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">允许所有专家会诊，无数量上限</p>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input 
                          type="radio" 
                          name="expertLimit" 
                          checked={expertLimitType === '仅允许指定专家'} 
                          onChange={() => setExpertLimitType('仅允许指定专家')}
                          className="text-blue-500" 
                        />
                        <label className="text-sm text-gray-700">仅允许指定专家</label>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">选择专家设上限，其他专家完全不可用</p>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <input 
                          type="radio" 
                          name="expertLimit" 
                          checked={expertLimitType === '限制特定专家'} 
                          onChange={() => setExpertLimitType('限制特定专家')}
                          className="text-blue-500" 
                        />
                        <label className="text-sm text-gray-700">限制特定专家</label>
                      </div>
                      <p className="text-xs text-gray-500 ml-6">选择专家设上限，其他专家不限数量</p>
                    </div>
                    {expertLimitType !== '不限制' && (
                      <div className="mt-4 p-2 bg-gray-50 rounded-md">
                        <div className="text-sm font-medium text-gray-700 mb-2">已配置专家限制</div>
                        <div className="space-y-2">
                          {expertLimits.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div className="relative">
                                <input 
                                  type="text" 
                                  value={item.expert} 
                                  onChange={(e) => handleExpertNameInput(item.id, e.target.value)}
                                  placeholder="请输入专家姓名"
                                  className="px-2 py-1 border border-gray-300 rounded-md w-32"
                                />
                                {showExpertDropdown && currentEditingExpertId === item.id && (
                                  <div className="absolute z-10 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-sm">
                                    {expertMatchResults.length > 0 ? (
                                      expertMatchResults.map((expert) => (
                                        <div 
                                          key={expert.id} 
                                          className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                                          onClick={() => handleSelectExpert(item.id, expert)}
                                        >
                                          {expert.name} ({expert.department}，{expert.hospital})
                                        </div>
                                      ))
                                    ) : (
                                      <div className="px-2 py-1 text-gray-500">
                                        无匹配结果
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-500">限制数量:</span>
                                  <input 
                                    type="number" 
                                    value={item.limit} 
                                    onChange={(e) => handleUpdateExpert(item.id, 'limit', parseInt(e.target.value) || 0)}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded-md" 
                                  />
                                </div>
                                <span className="text-gray-500">已用数量: {item.used}</span>
                                <button 
                                  className="text-red-500 hover:underline text-sm" 
                                  onClick={() => handleDeleteExpert(item.id)}
                                >
                                  删除
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button 
                          className="mt-3 text-blue-500 hover:underline text-sm flex items-center gap-1"
                          onClick={handleAddExpert}
                        >
                          <span>+ 添加专家</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* 科室服务限制 */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-700 font-medium">科室服务限制</span>
                    </div>
                    <div className="text-gray-500">
                      非会诊类型服务，不支持服务限制配置
                    </div>
                  </div>

                  {/* 专家服务限制 */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-700 font-medium">专家服务限制</span>
                    </div>
                    <div className="text-gray-500">
                      非会诊类型服务，不支持服务限制配置
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 保存确认弹窗 */}
      {isSaveConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">保存确认</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-4">确定要保存当前配置吗？</p>
              <div className="flex justify-end gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={handleCloseSaveConfirmModal}>
                  取消
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={handleConfirmSave}>
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 退出确认弹窗 */}
      {isExitConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">退出确认</h3>
              <button className="text-gray-400 hover:text-gray-600" onClick={handleCloseExitConfirmModal}>
                ×
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-4">确定要退出编辑模式吗？</p>
              <div className="flex justify-end gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={handleConfirmExit}>
                  不保存退出
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600" onClick={handleSaveAndExit}>
                  保存并退出
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑项目集抽屉 */}
      <EditProjectDrawer
        isOpen={isEditDrawerOpen}
        onClose={handleCloseEditDrawer}
        onConfirm={handleCloseEditDrawer}
      />

      {/* 标注浮窗 - 服务统计模块 */}
      {activeTooltip === '4' && (
        <div 
          className="annotation-tooltip"
          style={{ 
            left: `${annotationTooltipPosition.x}px`, 
            top: `${annotationTooltipPosition.y}px`,
            zIndex: 9999
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tooltip-header">
            <span>4 需求描述：服务统计模块</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>展示服务的使用统计信息，包括总数量、已分配数量、已发起数量、已完成数量和完成率</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户进入服务详情页</li>
              <li>查看服务统计信息</li>
              <li>切换服务类型查看不同服务的统计数据</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>总数量：</strong>数字，必填，10位，服务的总数量</li>
              <li><strong>已分配：</strong>数字，必填，10位，服务的已分配数量，即各项目的分配数量之和</li>
              <li><strong>已发起：</strong>数字，必填，10位，已使用服务发起的工单量（踢出已取消状态数据）</li>
              <li><strong>已完成：</strong>数字，必填，10位，服务的"已完成"状态数量</li>
              <li><strong>完成率：</strong>百分比，必填，5位，0-100%，服务的完成比例，计算公式：已完成数量/服务数量</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong>支持切换服务类型查看不同服务的统计数据</p>
          </div>
        </div>
      )}

      {/* 标注浮窗 - 服务限制模块 */}
      {activeTooltip === '5' && (
        <div 
          className="annotation-tooltip"
          style={{ 
            left: `${annotationTooltipPosition.x}px`, 
            top: `${annotationTooltipPosition.y}px`,
            zIndex: 9999
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tooltip-header">
            <span>5 需求描述：服务限制模块</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>展示和配置服务的限制策略，包括专家服务数量限制、患者服务次数限制、科室及数量限制</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户进入服务详情页</li>
              <li>查看服务限制信息</li>
              <li>点击限制配置按钮，打开限制配置弹窗</li>
              <li>在弹窗中查看或修改限制配置</li>
              <li>点击保存按钮保存修改</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>专家服务数量限制：</strong>文本，必填，50字符，专家服务数量限制</li>
              <li><strong>患者服务次数限制：</strong>文本，必填，50字符，患者服务次数限制</li>
              <li><strong>科室及数量限制：</strong>文本/链接，必填，50字符，可点击，科室及数量限制，可点击查看详情</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>限制配置：点击限制配置按钮，打开限制配置弹窗</li>
              <li>查看科室限制：点击查看链接，弹出科室限制详情弹窗</li>
            </ul>
          </div>
        </div>
      )}

      {/* 标注浮窗 - 项目分配模块 */}
      {activeTooltip === '6' && (
        <div 
          className="annotation-tooltip"
          style={{ 
            left: `${annotationTooltipPosition.x}px`, 
            top: `${annotationTooltipPosition.y}px`,
            zIndex: 9999
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tooltip-header">
            <span>6 需求描述：项目分配模块</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>展示服务在各项目中的分配情况，包括项目名称、分配数量、已发起数量、已完成数量、完成率、科室限制、专家限制等</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户进入服务详情页</li>
              <li>查看项目分配列表</li>
              <li>点击查看按钮，查看项目详情</li>
              <li>点击限制配置按钮，打开限制配置弹窗</li>
              <li>点击数量分配按钮，打开数量分配弹窗</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>项目名称：</strong>文本，必填，100字符，项目的名称</li>
              <li><strong>分配数量：</strong>数字，必填，10位，服务在该项目中的分配数量</li>
              <li><strong>已发起数量：</strong>数字，必填，10位，服务在该项目中的已发起数量</li>
              <li><strong>已完成数量：</strong>数字，必填，10位，服务在该项目中的已完成数量</li>
              <li><strong>完成率：</strong>百分比，必填，5位，0-100%，服务在该项目中的完成比例</li>
              <li><strong>科室限制：</strong>文本，必填，50字符，该项目的科室限制</li>
              <li><strong>专家限制：</strong>文本，必填，50字符，该项目的专家限制</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>查看：点击查看按钮查看项目详情</li>
              <li>限制配置：点击限制配置按钮打开限制配置弹窗</li>
              <li>数量分配：点击数量分配按钮打开数量分配弹窗</li>
            </ul>
          </div>
        </div>
      )}

      {/* 标注浮窗 - 数量分配弹窗 */}
      {activeTooltip === '10' && (
        <div 
          className="annotation-tooltip"
          style={{ 
            left: `${annotationTooltipPosition.x}px`, 
            top: `${annotationTooltipPosition.y}px`,
            zIndex: 9999
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tooltip-header">
            <span>10 需求描述：数量分配弹窗</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>用于查看和编辑服务在各项目中的分配数量，支持查看模式和编辑模式切换</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户点击服务详情页的数量分配按钮</li>
              <li>弹出数量分配弹窗，默认显示查看模式</li>
              <li>点击编辑按钮进入编辑模式</li>
              <li>调整服务分配数量</li>
              <li>点击保存按钮保存修改，或点击返回按钮放弃修改</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>项目名称：</strong>文本，必填，100字符，项目的名称</li>
              <li><strong>当前分配：</strong>数字，必填，10位，当前分配给该项目的服务数量</li>
              <li><strong>已发起：</strong>数字，必填，10位，该项目已发起的服务数量</li>
              <li><strong>已完成：</strong>数字，必填，10位，该项目已完成的服务数量</li>
              <li><strong>调整为：</strong>数字输入，必填，10位，调整后的服务分配数量（编辑模式）</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>切换服务类型：点击服务标签，切换不同类型的服务</li>
              <li>编辑：进入编辑模式，可调整服务分配数量</li>
              <li>保存：保存修改，切换回查看模式</li>
              <li>返回：放弃修改，切换回查看模式</li>
            </ul>
          </div>
        </div>
      )}

      {/* 标注浮窗 - 限制配置弹窗 */}
      {activeTooltip === '11' && (
        <div 
          className="annotation-tooltip"
          style={{ 
            left: `${annotationTooltipPosition.x}px`, 
            top: `${annotationTooltipPosition.y}px`,
            zIndex: 9999
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tooltip-header">
            <span>11 需求描述：限制配置弹窗</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>用于查看和修改服务的限制策略，包括科室服务限制和专家服务限制</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户点击服务详情页的限制配置按钮</li>
              <li>弹出限制配置弹窗，默认显示查看模式</li>
              <li>点击修改按钮进入修改模式</li>
              <li>修改限制配置，包括科室服务限制和专家服务限制</li>
              <li>点击保存按钮保存修改，或点击返回按钮放弃修改</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>科室服务限制：</strong>下拉选择，必填，枚举值：不限制、仅允许指定科室、限制特定科室</li>
              <li><strong>已配置科室限制：</strong>表格，非必填，已配置的科室限制，包括科室、限制数量、已使用数量</li>
              <li><strong>专家服务限制：</strong>下拉选择，必填，枚举值：不限制、仅允许指定专家、限制特定专家</li>
              <li><strong>已配置专家限制：</strong>表格，非必填，已配置的专家限制，包括专家、限制数量、已使用数量</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>切换服务类型：点击服务标签，切换不同类型的服务</li>
              <li>修改：进入修改模式，可修改限制配置</li>
              <li>保存：保存修改并关闭弹窗</li>
              <li>返回：放弃修改并关闭弹窗</li>
              <li>添加科室：添加新的科室限制</li>
              <li>删除科室：删除已有的科室限制</li>
              <li>添加专家：添加新的专家限制</li>
              <li>删除专家：删除已有的专家限制</li>
            </ul>
          </div>
        </div>
      )}

      {/* 标注12浮窗 - 修改限制配置页面 */}
      {activeTooltip === '12' && (
        <div 
          className="annotation-tooltip"
          style={{ 
            left: `${annotationTooltipPosition.x}px`, 
            top: `${annotationTooltipPosition.y}px`,
            zIndex: 9999
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="tooltip-header">
            <span>12 需求描述：修改限制配置页面</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>用于修改服务的限制配置，包括科室服务限制和专家服务限制的完整配置页面</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户点击限制配置弹窗的修改配置按钮</li>
              <li>进入修改限制配置页面，显示完整的配置表单</li>
              <li>修改科室服务限制类型和具体配置</li>
              <li>修改专家服务限制类型和具体配置</li>
              <li>点击保存配置按钮保存修改，或点击返回按钮退出</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>服务类型切换：</strong>标签按钮，支持切换专家案例教学和远程门诊</li>
              <li><strong>科室服务限制类型：</strong>单选按钮，选项：不限制、仅允许指定科室、限制特定科室</li>
              <li><strong>已配置科室限制：</strong>表格，包含科室名称（可搜索）、限制数量、已用数量、删除操作</li>
              <li><strong>专家服务限制类型：</strong>单选按钮，选项：不限制、仅允许指定专家、限制特定专家</li>
              <li><strong>已配置专家限制：</strong>表格，包含专家姓名（可搜索）、限制数量、已用数量、删除操作</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>切换服务类型：点击服务标签切换</li>
              <li>修改限制类型：选择不同的单选按钮</li>
              <li>添加科室：点击添加科室按钮，输入科室名称和限制数量</li>
              <li>删除科室：点击删除按钮移除科室限制</li>
              <li>添加专家：点击添加专家按钮，输入专家姓名和限制数量</li>
              <li>删除专家：点击删除按钮移除专家限制</li>
              <li>保存配置：保存所有修改并返回</li>
              <li>返回：退出编辑模式，未保存时弹出确认弹窗</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiceDetail;