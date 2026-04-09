import React, { useState } from 'react';

function EditProjectDrawer({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  // 标注浮窗状态
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [annotationTooltipPosition, setAnnotationTooltipPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // 处理标注角标悬停
  const handleAnnotationMouseEnter = (e, id) => {
    const rect = e.target.getBoundingClientRect();
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
    <div className="fixed inset-0 z-50">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out" onClick={onClose}></div>
      
      {/* 右侧抽屉 */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-white shadow-2xl transform transition-all duration-300 ease-out translate-x-0">
        {/* 标注角标 */}
        <div 
          className="annotation-badge" 
          data-id="8" 
          style={{ position: 'absolute', top: '8px', right: '52%', zIndex: '1001' }}
          onMouseEnter={(e) => handleAnnotationMouseEnter(e, '8')}
        >8</div>
        
        {/* 抽屉头部 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">编辑项目集</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            ×
          </button>
        </div>
        
        {/* 抽屉内容 */}
        <div className="p-4 overflow-y-auto h-[calc(100%-120px)]">
          {/* 项目集名称 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span>项目集名称
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="AZ帮扶项目"
            />
          </div>
          
          {/* 备注名 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">备注名</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="AZ公益项目"
            />
          </div>
          
          {/* 服务分配方式 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span>服务分配方式
            </label>
            <div className="flex gap-4">
              <div className="flex items-center">
                <input type="radio" id="contract" name="allocation" defaultChecked />
                <label htmlFor="contract" className="ml-1 text-sm text-gray-700">关联合同</label>
              </div>
              <div className="flex items-center">
                <input type="radio" id="manual" name="allocation" />
                <label htmlFor="manual" className="ml-1 text-sm text-gray-700">手动配置</label>
              </div>
            </div>
          </div>
          
          {/* 合同名称 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">合同名称</label>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 border border-gray-200 rounded-md">
                <span className="text-sm text-gray-700">捐赠协议</span>
                <button className="text-red-500 text-sm">删除</button>
              </div>
              <button className="text-blue-500 text-sm flex items-center">
                <span>+</span> <span className="ml-1">添加合同</span>
              </button>
            </div>
          </div>
          
          {/* 服务配置 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span>服务配置
            </label>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">服务包</th>
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">服务</th>
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">所属合同</th>
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">服务数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2 px-2 text-sm text-gray-700">专家案例培训</td>
                    <td className="py-2 px-2 text-sm text-gray-700">专家案例培训*1</td>
                    <td className="py-2 px-2 text-sm text-gray-700">捐赠协议</td>
                    <td className="py-2 px-2 text-sm text-gray-700">2070</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 服务限制 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">服务限制</label>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">服务</th>
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">专家服务数量限制</th>
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">患者服务次数限制</th>
                    <th className="py-2 px-2 font-medium text-gray-500 text-xs">科室及数量限制</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-2 text-sm text-gray-700">专家案例培训</td>
                    <td className="py-2 px-2">
                      <input type="text" defaultValue="100" className="w-20 px-2 py-1 border border-gray-300 rounded-md" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="text" defaultValue="1" className="w-20 px-2 py-1 border border-gray-300 rounded-md" />
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="unlimited" name="departmentLimit" defaultChecked />
                        <label htmlFor="unlimited" className="text-sm text-gray-700">无限制</label>
                        <input type="radio" id="limited" name="departmentLimit" />
                        <label htmlFor="limited" className="text-sm text-gray-700">有限制</label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 开始时间 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span>开始时间
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="2025-08-01"
            />
          </div>

          {/* 结束时间 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">结束时间</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center">
                <input type="radio" id="longTerm" name="endTime" />
                <label htmlFor="longTerm" className="ml-1 text-sm text-gray-700">长期有效</label>
              </div>
            </div>
          </div>

          {/* 项目经理 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">项目经理</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">张博</option>
              <option value="">其他选项</option>
            </select>
          </div>
        </div>
        
        {/* 抽屉底部 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white flex justify-end gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50" onClick={onClose}>
            取消
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={onConfirm}>
            确认
          </button>
        </div>
      </div>

      {/* 标注浮窗 - 编辑项目集抽屉 */}
      {activeTooltip === '8' && (
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
            <span>8 需求描述：编辑项目集抽屉</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>用于编辑项目集的基本信息和服务配置，包括项目集名称、备注名、服务分配方式、合同名称、服务配置等</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户点击项目集详情页的编辑按钮</li>
              <li>右侧滑入编辑项目集抽屉</li>
              <li>修改项目集信息和服务配置</li>
              <li>点击确认按钮保存修改，或点击取消按钮放弃修改</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>项目集名称：</strong>文本，必填，255字符，项目集的名称</li>
              <li><strong>备注名：</strong>文本，非必填，255字符，项目集的备注名称</li>
              <li><strong>服务分配方式：</strong>单选，必填，枚举值：关联合同、手动配置，项目集的分配方式</li>
              <li><strong>合同名称：</strong>文本/列表，非必填，255字符，项目集关联的合同列表</li>
              <li><strong>服务配置：</strong>表格，必填，项目集包含的服务配置，包括服务包、服务、所属合同、服务数量</li>
              <li><strong>开始时间：</strong>日期，必填，项目集的开始时间</li>
              <li><strong>结束时间：</strong>日期，非必填，项目集的结束时间</li>
              <li><strong>项目经理：</strong>下拉选择，非必填，项目集的负责人</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>取消：关闭抽屉，不保存修改</li>
              <li>确认：保存修改并关闭抽屉</li>
              <li>添加合同：添加新的合同</li>
              <li>删除合同：删除已有的合同</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditProjectDrawer;