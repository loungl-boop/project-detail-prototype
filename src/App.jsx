import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EditProjectDrawer from './EditProjectDrawer';
import DepartmentLimitModal from './DepartmentLimitModal';
import ServiceDetail from './ServiceDetail';
import './App.css';

function App() {
  const navigate = useNavigate();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDepartmentLimitModalOpen, setIsDepartmentLimitModalOpen] = useState(false);
  // 查看服务限制配置弹窗状态
  const [isViewLimitModalOpen, setIsViewLimitModalOpen] = useState(false);
  // 提示弹窗状态
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  // 更多操作菜单状态
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [moreMenuPosition, setMoreMenuPosition] = useState({ x: 0, y: 0 });
  // 标注浮窗状态
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [annotationTooltipPosition, setAnnotationTooltipPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  // 数量分配弹窗状态
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [quantityModalMode, setQuantityModalMode] = useState('view');

  const handleContractClick = () => {
    navigate('/contract-detail');
  };

  const handleEditClick = () => {
    setIsEditDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsEditDrawerOpen(false);
  };

  const handleConfirmEdit = () => {
    // 这里可以添加确认编辑的逻辑
    setIsEditDrawerOpen(false);
  };

  const handleDepartmentLimitClick = () => {
    setIsDepartmentLimitModalOpen(true);
  };

  const handleCloseDepartmentLimitModal = () => {
    setIsDepartmentLimitModalOpen(false);
  };

  // 处理打开数量分配弹窗
  const handleOpenQuantityModal = () => {
    setIsQuantityModalOpen(true);
    setQuantityModalMode('view');
  };

  // 处理关闭数量分配弹窗
  const handleCloseQuantityModal = () => {
    setIsQuantityModalOpen(false);
  };

  // 处理保存数量分配
  const handleSaveQuantity = () => {
    alert('保存成功');
    setQuantityModalMode('view');
  };

  const handleTooltipClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    // 计算弹窗位置，使其显示在按钮上方并居中对齐
    setTooltipPosition({
      x: rect.left + rect.width / 2 - 160, // 160是弹窗宽度的一半 (w-80 = 320px, 320/2 = 160px)
      y: rect.top - 140 // 调整Y坐标，确保弹窗显示在按钮上方
    });
    setIsTooltipOpen(true);
  };

  const handleCloseTooltip = () => {
    setIsTooltipOpen(false);
  };

  // 处理更多按钮点击
  const handleMoreButtonClick = (e) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setMoreMenuPosition({
      x: rect.right - 120, // 调整X坐标，确保菜单在按钮右侧
      y: rect.bottom + 5 // 调整Y坐标，确保菜单在按钮下方
    });
    setIsMoreMenuOpen(true);
  };

  // 处理关闭更多菜单
  const handleCloseMoreMenu = () => {
    setIsMoreMenuOpen(false);
  };

  // 处理服务限制配置点击
  const handleServiceConfigClick = () => {
    setIsMoreMenuOpen(false);
    setIsViewLimitModalOpen(true);
  };

  // 处理关闭查看服务限制配置弹窗
  const handleCloseViewLimitModal = () => {
    setIsViewLimitModalOpen(false);
  };

  const handleServiceDetailClick = () => {
    navigate('/service-detail');
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

  // 处理浮窗拖拽开始
  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - annotationTooltipPosition.x,
      y: e.clientY - annotationTooltipPosition.y
    });
  };

  // 处理浮窗拖拽移动
  const handleDragMove = (e) => {
    if (isDragging) {
      setAnnotationTooltipPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  // 处理浮窗拖拽结束
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
                  <Link to="/" className="flex items-center gap-2 p-2 rounded-md bg-blue-50 text-blue-600 whitespace-nowrap">
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
          {/* 项目标题 */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                  返回
                </button>
                <h1 className="text-xl font-semibold text-gray-900">AZ帮扶项目2026</h1>
                <span className="text-sm text-gray-500">ID: 12345678</span>
              </div>
            </div>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-1">
              消息推送
              <span className="text-gray-400">▼</span>
            </button>
          </div>

          {/* 基础信息和服务内容 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            {/* 基础信息 */}
            <div className="border-b border-gray-200 pb-6 mb-6 relative">
              {/* 标注角标 */}
              <div 
                className="annotation-badge" 
                data-id="1" 
                style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1000' }}
                onMouseEnter={(e) => handleAnnotationMouseEnter(e, '1')}
              >1</div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">基础信息</h3>
                <button className="text-blue-500 hover:underline flex items-center gap-1" onClick={handleEditClick}>
                  <span>编辑</span>
                  <span>✏️</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">开始时间</div>
                  <div className="text-gray-700">2026-01-01</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">结束时间</div>
                  <div className="text-gray-700">2026-12-31</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">项目负责人</div>
                  <div className="text-gray-700">张明远</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">客户名称</div>
                  <div className="text-gray-700">阿斯利康投资（中国）有限公司</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">分配方式</div>
                  <div className="text-gray-700">关联合同</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">合同</div>
                  <div className="text-blue-500 cursor-pointer" onClick={handleContractClick}>AZ捐赠协议，AZ补充协议</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">备注</div>
                  <div className="text-gray-700">AZ公益项目</div>
                </div>
              </div>
            </div>

            {/* 服务内容 */}
            <div className="relative">
              {/* 标注角标 */}
              <div 
                className="annotation-badge" 
                data-id="2" 
                style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1000' }}
                onMouseEnter={(e) => handleAnnotationMouseEnter(e, '2')}
              >2</div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">服务内容</h3>
              </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[150px]">服务名称</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[100px]">服务数量</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[100px]">已发起数量</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[100px]">已完成数量</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[120px]">完成率</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[250px]">
                      <div className="flex items-center gap-1">
                        <span>限制策略</span>
                        <span className="text-gray-400 cursor-pointer" onClick={handleTooltipClick}>ℹ️</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[100px] sticky right-0 bg-white">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">专家案例教学</td>
                    <td className="py-3 px-4 text-gray-700">1000</td>
                    <td className="py-3 px-4 text-gray-700">900</td>
                    <td className="py-3 px-4 text-gray-700">800</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">80%</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">专家限制：100次/人<br />患者限制：1次/人<br />科室限制：无限制</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <button className="text-blue-500 hover:underline" onClick={handleServiceDetailClick}>查看</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">大病会诊</td>
                    <td className="py-3 px-4 text-gray-700">500</td>
                    <td className="py-3 px-4 text-gray-700">400</td>
                    <td className="py-3 px-4 text-gray-700">300</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">60%</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">专家限制：不限次/人<br />患者限制：30次/人<br />科室限制：无限制</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <button className="text-blue-500 hover:underline" onClick={handleServiceDetailClick}>查看</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">远程门诊</td>
                    <td className="py-3 px-4 text-gray-700">30</td>
                    <td className="py-3 px-4 text-gray-700">15</td>
                    <td className="py-3 px-4 text-gray-700">10</td>
                    <td className="py-3 px-4">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">33%</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">专家限制：10次/人<br />患者限制：不限制/人<br />科室限制：<span className="text-blue-500 cursor-pointer hover:underline" onClick={handleDepartmentLimitClick}>查看</span></td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <button className="text-blue-500 hover:underline" onClick={handleServiceDetailClick}>查看</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
          </div>

          {/* 项目清单 */}
          <div className="bg-white rounded-lg shadow-sm p-6 relative">
            {/* 标注角标 */}
            <div 
              className="annotation-badge" 
              data-id="3" 
              style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1000' }}
              onMouseEnter={(e) => handleAnnotationMouseEnter(e, '3')}
            >3</div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">项目清单</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center gap-1" onClick={handleOpenQuantityModal}>
                  <span>服务分配情况</span>
                  <span>📊</span>
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-green-600">
                  <span>新建项目</span>
                  <span>+</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[150px] whitespace-nowrap">项目名称</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[200px] whitespace-nowrap">项目周期</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[120px] whitespace-nowrap">进度</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[100px]">状态</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[150px]">项目经理</th>
                    <th className="py-3 px-4 font-medium text-gray-500 min-w-[120px] sticky right-0 bg-white">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">健康察布查尔2025</td>
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">2026-01-01 至 2026-12-31</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">100%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-500 rounded-full text-sm">进行中</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">张经理</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:underline">查看</button>
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleMoreButtonClick}>更多</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">健康习水2025</td>
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">2026-01-01 至 长期有效</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">80%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-500 rounded-full text-sm">已暂停</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">李经理，王经理</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:underline">查看</button>
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleMoreButtonClick}>更多</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">健康横峰2025</td>
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">2026-01-01 至 长期有效</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">33%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">已归档</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">范经理</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:underline">查看</button>
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleMoreButtonClick}>更多</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">健康范县2025</td>
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">2026-01-01 至 2026-12-31</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">100%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">已归档</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">张经理</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:underline">查看</button>
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleMoreButtonClick}>更多</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">健康台前2025</td>
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">2026-01-01 至 2026-12-31</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">80%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">已归档</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">李经理，王经理</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:underline">查看</button>
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleMoreButtonClick}>更多</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">健康吉木乃2025</td>
                    <td className="py-3 px-4 text-gray-700 whitespace-nowrap">2026-01-01 至 2026-12-31</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '33%' }}></div>
                      </div>
                      <span className="text-sm text-gray-600">33%</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-sm">已归档</span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">范经理</td>
                    <td className="py-3 px-4 sticky right-0 bg-white">
                      <div className="flex gap-2">
                        <button className="text-blue-500 hover:underline">查看</button>
                        <button className="text-gray-500 hover:text-gray-700" onClick={handleMoreButtonClick}>更多</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EditProjectDrawer
        isOpen={isEditDrawerOpen}
        onClose={handleCloseDrawer}
        onConfirm={handleConfirmEdit}
      />
      <DepartmentLimitModal
        isOpen={isDepartmentLimitModalOpen}
        onClose={handleCloseDepartmentLimitModal}
      />

      {/* 查看服务限制配置弹窗 */}
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
                <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md text-sm">
                  专家案例教学
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50">
                  远程门诊
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-700 font-medium">科室服务限制</span>
                </div>
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <input type="radio" name="departmentLimit" checked className="text-blue-500" />
                    <label className="text-sm text-gray-700">不限制</label>
                  </div>
                  <p className="text-xs text-gray-500 ml-6">允许所有科室会诊，无数量上限</p>
                </div>
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
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="text-blue-500 hover:underline text-sm">
                  修改配置
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 数量分配弹窗 */}
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
                        <input type="text" defaultValue="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
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
                        <input type="text" defaultValue="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
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
                        <input type="text" defaultValue="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
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
                        <input type="text" defaultValue="100" className="w-16 px-2 py-1 border border-gray-300 rounded-md" />
                      </div>
                    )}
                  </div>
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
                    返回
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
              <li>用户点击服务分配情况按钮</li>
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

      {isTooltipOpen && (
        <div className="fixed left-0 top-0 w-full h-full z-50" onClick={handleCloseTooltip}>
          <div 
            className="absolute bg-gray-800 text-white p-3 rounded text-xs w-80 z-50"
            style={{ left: `${tooltipPosition.x}px`, top: `${tooltipPosition.y}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1">专家限制：用于限制专家（项目内）可提供的最大服务数量。</div>
            <div className="mb-1">患者限制：用于限制项目集内，同一患者可申请该服务的次数。</div>
            <div>科室限制：用于限制患者可申请服务时，可选择的拟申请会诊科室及每个科室可发起的最大数量；与患者服务次数限制，配合使用。</div>
          </div>
        </div>
      )}

      {/* 更多操作菜单 */}
      {isMoreMenuOpen && (
        <div className="fixed left-0 top-0 w-full h-full z-50" onClick={handleCloseMoreMenu}>
          <div 
            className="absolute bg-white border border-gray-200 rounded-md shadow-lg w-32 py-1 z-50"
            style={{ left: `${moreMenuPosition.x}px`, top: `${moreMenuPosition.y}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">编辑</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleServiceConfigClick}>服务限制配置</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">暂停</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">恢复</div>
            <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">结束</div>
          </div>
        </div>
      )}

      {/* 标注浮窗 */}
      {activeTooltip === '1' && (
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
            <span>1 需求描述：基础信息模块</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>展示和编辑项目集的基本信息，包括项目集名称、开始时间、结束时间、项目负责人、客户名称、分配方式、合同、备注等</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户进入项目集详情页</li>
              <li>查看基础信息</li>
              <li>点击编辑按钮</li>
              <li>在右侧滑入的抽屉中修改信息</li>
              <li>点击保存按钮</li>
              <li>系统保存修改并关闭抽屉</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>项目集名称：</strong>文本，必填，255字符，项目集的名称</li>
              <li><strong>开始时间：</strong>日期，必填，格式YYYY-MM-DD，项目集的开始时间</li>
              <li><strong>结束时间：</strong>日期，必填，格式YYYY-MM-DD，项目集的结束时间</li>
              <li><strong>项目负责人：</strong>下拉选择、多选，非必填，50字符，项目集的负责人</li>
              <li><strong>客户名称：</strong>文本，必填，255字符，项目集的客户名称</li>
              <li><strong>分配方式：</strong>单选，必填，枚举值：关联合同、手动分配，项目集的分配方式</li>
              <li><strong>合同：</strong>文本/链接，非必填，255字符，可点击，项目集关联的合同，可点击跳转到合同详情页</li>
              <li><strong>备注：</strong>文本，非必填，500字符，项目集的备注信息</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong>支持编辑基础信息，点击编辑按钮打开右侧抽屉进行修改</p>
          </div>
        </div>
      )}

      {activeTooltip === '2' && (
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
            <span>2 需求描述：服务内容模块</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>展示项目集包含的服务及其使用情况，包括服务名称、服务数量、已发起数量、已完成数量、完成率、限制策略等</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户进入项目集详情页</li>
              <li>查看服务内容列表</li>
              <li>点击查看按钮，跳转到服务详情页</li>
              <li>点击科室限制中的查看链接，弹出科室限制详情弹窗</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>服务名称：</strong>文本，必填，100字符，合同中服务的名称</li>
              <li><strong>服务数量：</strong>数字，必填，10位，合同中服务的总数量</li>
              <li><strong>已发起数量：</strong>数字，必填，10位，已使用服务发起的工单量（踢出已取消状态数据）</li>
              <li><strong>已完成数量：</strong>数字，必填，10位，服务的已完成状态数量</li>
              <li><strong>完成率：</strong>百分比，必填，5位，0-100%，服务的完成比例，计算公式：已完成数量/服务数量</li>
              <li><strong>专家限制：</strong>文本，必填，50字符，专家服务数量限制</li>
              <li><strong>患者限制：</strong>文本，必填，50字符，患者服务次数限制</li>
              <li><strong>科室限制：</strong>文本/链接，必填，50字符，可点击，科室及数量限制，可点击查看详情</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong>支持查看服务详情，点击查看按钮跳转到服务详情页</p>
          </div>
        </div>
      )}

      {activeTooltip === '3' && (
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
            <span>3 需求描述：项目清单模块</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>展示项目集中的项目列表及其状态，包括项目名称、项目周期、项目进度、状态、项目经理等</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户进入项目集详情页</li>
              <li>查看项目清单</li>
              <li>点击查看按钮，跳转到项目详情页</li>
              <li>点击更多按钮，弹出操作菜单</li>
              <li>选择操作（编辑、服务配置、暂停、恢复、结束）</li>
              <li>点击服务分配情况按钮，弹出数量分配弹窗</li>
              <li>点击新增项目按钮，打开新增项目页面</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>项目名称：</strong>文本，必填，100字符，项目的名称</li>
              <li><strong>项目周期：</strong>文本，必填，50字符，项目的开始和结束时间</li>
              <li><strong>项目进度：</strong>百分比，必填，5位，0-100%，项目的完成进度</li>
              <li><strong>状态：</strong>标签，必填，10字符，枚举值：进行中、已暂停、已归档，项目的状态</li>
              <li><strong>项目经理：</strong>文本，必填，50字符，项目的负责人</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>查看：点击查看按钮跳转到项目详情页</li>
              <li>更多：点击更多按钮弹出操作菜单</li>
              <li>服务分配情况：点击弹出数量分配弹窗</li>
              <li>新建项目：点击打开新增项目页面</li>
            </ul>
          </div>
        </div>
      )}

      {/* 标注11浮窗 - 限制配置弹窗 */}
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
              <li>用户点击服务限制配置按钮</li>
              <li>弹出限制配置弹窗，默认显示查看模式</li>
              <li>查看科室服务限制和专家服务限制配置</li>
              <li>点击修改配置按钮进入修改模式</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>服务类型：</strong>标签按钮，用于切换专家案例教学和远程门诊</li>
              <li><strong>科室服务限制：</strong>单选按钮，选项：不限制、仅允许指定科室、限制特定科室</li>
              <li><strong>已配置科室限制：</strong>表格，包含科室、限制数量、已用数量、剩余数量</li>
              <li><strong>专家服务限制：</strong>单选按钮，选项：不限制、仅允许指定专家、限制特定专家</li>
              <li><strong>已配置专家限制：</strong>表格，包含专家、限制数量、已用数量、剩余数量</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>切换服务类型：点击服务标签切换</li>
              <li>关闭弹窗：点击右上角X按钮或遮罩层</li>
              <li>修改配置：点击修改配置按钮进入修改页面</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
