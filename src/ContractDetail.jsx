import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ContractDetail() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

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
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>项目中心</span>
              </a>
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
                <span>会员中心</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 whitespace-nowrap">
                <span>医疗资源</span>
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
              <a href="#" className="flex items-center gap-2 p-2 rounded-md bg-blue-50 text-blue-600 whitespace-nowrap">
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
                <span>资讯房间</span>
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
                <span>大病会诊</span>
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
                合同管理 &gt; 合同详情
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
          {/* 合同标题 */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50" onClick={handleBackClick}>
                  返回
                </button>
                <h1 className="text-xl font-semibold text-gray-900">中国石油茫崖市医疗帮扶项目捐赠协议</h1>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-md text-sm">待签约</span>
              </div>
            </div>
          </div>

          {/* 基础信息 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 relative">
            {/* 标注角标 */}
            <div 
              className="annotation-badge" 
              data-id="7" 
              style={{ position: 'absolute', top: '-8px', right: '-4px', zIndex: '1000' }}
              onMouseEnter={(e) => handleAnnotationMouseEnter(e, '7')}
            >7</div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">基础信息</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">合同ID</div>
                <div className="text-gray-700">6130000331</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">合同编号</div>
                <div className="text-gray-700">-</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">合同名称</div>
                <div className="text-gray-700">中国石油茫崖市医疗帮扶项目捐赠协议</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">签约方式</div>
                <div className="text-gray-700">线下签约</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">签约渠道</div>
                <div className="text-gray-700">直销客户渠道</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">商务负责人</div>
                <div className="text-gray-700">张耀韬</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">甲方</div>
                <div className="text-gray-700">中国石油天然气股份有限公司</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">甲方联系人</div>
                <div className="text-gray-700">直销客户</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">乙方</div>
                <div className="text-gray-700">北京尤迈慈善基金会</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">乙方联系人</div>
                <div className="text-gray-700">张耀韬</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">合同周期</div>
                <div className="text-gray-700">2026-01-01 至 2026-12-31</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">合同附件</div>
                <div className="text-gray-700">-</div>
              </div>
            </div>
          </div>

          {/* 服务内容 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">服务内容</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-gray-500">服务内容</th>
                    <th className="py-3 px-4 font-medium text-gray-500">服务</th>
                    <th className="py-3 px-4 font-medium text-gray-500">产品</th>
                    <th className="py-3 px-4 font-medium text-gray-500">合同单价</th>
                    <th className="py-3 px-4 font-medium text-gray-500">采购数量</th>
                    <th className="py-3 px-4 font-medium text-gray-500">总价（元）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">远程案例教学</td>
                    <td className="py-3 px-4 text-gray-700">远程案例教学</td>
                    <td className="py-3 px-4 text-gray-700">远程案例教学*1</td>
                    <td className="py-3 px-4 text-gray-700">3000</td>
                    <td className="py-3 px-4 text-gray-700">100</td>
                    <td className="py-3 px-4 text-gray-700">300000</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-700">远程门诊</td>
                    <td className="py-3 px-4 text-gray-700">远程门诊</td>
                    <td className="py-3 px-4 text-gray-700">远程门诊*1</td>
                    <td className="py-3 px-4 text-gray-700">25000</td>
                    <td className="py-3 px-4 text-gray-700">22</td>
                    <td className="py-3 px-4 text-gray-700">550000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 赠送服务 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">赠送服务</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-gray-500">服务</th>
                    <th className="py-3 px-4 font-medium text-gray-500">产品</th>
                    <th className="py-3 px-4 font-medium text-gray-500">赠送数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 text-gray-700" colSpan={3}>
                      <div className="text-center text-gray-500">暂无数据</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 产品合计 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">产品合计</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 font-medium text-gray-500">产品</th>
                    <th className="py-3 px-4 font-medium text-gray-500">数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4 text-gray-700">远程门诊</td>
                    <td className="py-3 px-4 text-gray-700">22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 标注浮窗 - 合同详情页 */}
      {activeTooltip === '7' && (
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
            <span>7 需求描述：合同详情页</span>
            <span className="tooltip-close" onClick={handleTooltipClose}>X</span>
          </div>
          <div className="tooltip-content">
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>功能描述：</strong>展示合同的详细信息，包括合同基本信息、服务内容、赠送服务、产品合计等</p>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>业务流程：</strong></p>
            <ol style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li>用户从项目集详情页点击合同链接</li>
              <li>查看合同的详细信息</li>
              <li>点击返回按钮，返回项目集详情页</li>
            </ol>
            <p style={{marginBottom: '12px', lineHeight: '1.6'}}><strong>字段说明：</strong></p>
            <ul style={{marginBottom: '12px', paddingLeft: '20px', lineHeight: '1.6'}}>
              <li><strong>合同名称：</strong>文本，必填，255字符，合同的名称</li>
              <li><strong>合同编号：</strong>文本，必填，50字符，合同的编号</li>
              <li><strong>甲方：</strong>文本，必填，255字符，合同的甲方</li>
              <li><strong>乙方：</strong>文本，必填，255字符，合同的乙方</li>
              <li><strong>签订日期：</strong>日期，必填，格式YYYY-MM-DD，合同的签订日期</li>
              <li><strong>生效日期：</strong>日期，必填，格式YYYY-MM-DD，合同的生效日期</li>
              <li><strong>到期日期：</strong>日期，必填，格式YYYY-MM-DD，合同的到期日期</li>
              <li><strong>合同状态：</strong>标签，必填，10字符，枚举值：有效、已过期、已终止，合同的状态</li>
              <li><strong>合同内容：</strong>文本，必填，富文本，合同的详细内容</li>
            </ul>
            <p style={{lineHeight: '1.6'}}><strong>操作：</strong>点击返回按钮返回项目集详情页</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContractDetail;