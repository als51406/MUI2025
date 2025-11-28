import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import StatsGrid from './components/Dashboard/StatsGrid';
import ReportChart from './Chartcomponents/Chartgr';
import Doughnutchart from './Chartcomponents/Doughnutchart';
import RecentOrdersTable from './Chartcomponents/RecentOrderTable';
import TopSellingProducts from './Chartcomponents/TopsellingProduct';
import InvoiceList from './Chartcomponents/InvoiceList';

function App() {
  return (
    <ErrorBoundary>
      <div id='bodyWrap' role="application" aria-label="대시보드 애플리케이션">
        <Sidebar />

        <main id='mainWrap' role="main" aria-label="메인 콘텐츠">
          <Header />
          <StatsGrid />
     
          <section className='mainView' aria-label="차트 영역">
            <section className='reports' aria-labelledby="report-chart-title">
              <ReportChart/>
            </section>
            <section className='analytics' aria-labelledby="doughnut-chart-title">
              <Doughnutchart/>
            </section>
          </section>
             
          <section className='subView' aria-label="데이터 테이블 영역">
            <section className='recentorders' aria-labelledby="recent-orders-title">
              <RecentOrdersTable/>
            </section>
            <section className='topsellingproducts' aria-labelledby="top-products-title">
              <TopSellingProducts/>
            </section>
          </section>

          <InvoiceList/>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
