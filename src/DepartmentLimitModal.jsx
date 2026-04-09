import React, { useState } from 'react';

function DepartmentLimitModal({ isOpen, onClose }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-lg shadow-xl w-[500px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
        {/* 标注角标 */}
        <div 
          className="annotation-badge" 
          data-id="9" 
          style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1001' }}
          onMouseEnter={(e) => handleAnnotationMouseEnter(e, '9')}
        >9</div>
        
        {/* 弹窗头部 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">科室及专家限制</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>
            ×
          </button>
        </div>
        
        {/* 弹窗内容 */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="font-medium text-gray-700">可申请会诊科室</label>
            </div>
            <div>
              <label className="font-medium text-gray-700">最大会诊数量限制</label>
            </div>
          </div>
          
          {/* 科室列表 */}
          <div className="space-y-2">
            {/* 精神科 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" checked readOnly />
                <span className="text-gray-700">精神科</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span className="text-gray-700">精神科</span>
                  <div className="ml-auto text-gray-700">1</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span className="text-gray-700">精神心理科</span>
                  <div className="ml-auto text-gray-700">1</div>
                </div>
              </div>
            </div>
            
            {/* 药剂科 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" checked readOnly />
                <span className="text-gray-700">药剂科</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span className="text-gray-700">药剂科</span>
                  <div className="ml-auto text-gray-700">1</div>
                </div>
              </div>
            </div>
            
            {/* 内分泌科 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" checked readOnly />
                <span className="text-gray-700">内分泌科</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span className="text-gray-700">内分泌科</span>
                  <div className="ml-auto text-gray-700">1</div>
                </div>
              </div>
            </div>
            
            {/* 妇产科 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" checked readOnly />
                <span className="text-gray-700">妇产科</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span className="text-gray-700">妇科</span>
                  <div className="ml-auto text-gray-700">1</div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span className="text-gray-700">产科</span>
                  <div className="ml-auto text-gray-700">1</div>
                </div>
              </div>
            </div>
            
            {/* 临床营养科 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" checked readOnly />
                <span className="text-gray-700">临床营养科</span>
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly />
                  <span className="text-gray-700">临床营养科</span>
                  <div className="ml-auto text-gray-700">1</div>
                </div>
              </div>
            </div>
            
            {/* 超声医学科 */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <input type="checkbox" checked readOnly />
                <span className="text-gray-700">超声医学科</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 弹窗底部 */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
            修改
          </button>
        </div>
      </div>

      {/* 标注浮窗 - 科室限制详情弹窗 */}
      {activeTooltip === '9' && (
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
            <span>9 需求描述：科室限制详情弹窗</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>用于查看和修改科室限制，显示可申请会诊科室及其最大会诊数量限制</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户点击服务内容或服务详情页中的科室限制查看链接</li>
              <li>弹出科室限制详情弹窗</li>
              <li>查看或修改科室限制</li>
              <li>点击修改按钮保存修改，或点击取消按钮放弃修改</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>可申请会诊科室：</strong>复选框，必填，布尔值，可申请会诊的科室</li>
              <li><strong>最大会诊数量限制：</strong>数字，必填，10位，正整数，每个科室的最大会诊数量限制</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong></p>
            <ul style={{paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>取消：关闭弹窗，不保存修改</li>
              <li>修改：保存修改并关闭弹窗</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DepartmentLimitModal;