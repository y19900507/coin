import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useGet24hStatsQuery } from '../../services/rtk/marketApi';
import { formatPercent, formatNumberWithCommas } from '../../utils/formatters';

// 样式组件
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeroSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: #1a1a1a;
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin: 0 0 16px 0;
  color: #333;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 20px 0;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 12px 0;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const StatChange = styled.div<{ positive: boolean }>`
  font-size: 14px;
  color: ${props => props.positive ? '#52c41a' : '#f5222d'};
  margin-top: 8px;
`;

const CTASection = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
`;

const PrimaryButton = styled(Link)`
  background-color: #1890ff;
  color: white;
  padding: 12px 32px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  
  &:hover {
    background-color: #096dd9;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: #f0f0f0;
  color: #333;
  padding: 12px 32px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 16px;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

/**
 * 首页页面组件
 */
const Home: React.FC = () => {
  const { user, isAuthenticated } = useAppSelector(state => state.auth);
  const { data: marketStats, isLoading } = useGet24hStatsQuery(undefined);
  const [topGainers, setTopGainers] = useState<any[]>([]);
  const [topLosers, setTopLosers] = useState<any[]>([]);
  const [topVolume, setTopVolume] = useState<any[]>([]);
  
  // 当市场数据加载完成后，计算排名
  useEffect(() => {
    if (marketStats && marketStats.length > 0) {
      // 按涨幅排序
      const sorted = [...marketStats].sort((a, b) => b.priceChangePercent - a.priceChangePercent);
      setTopGainers(sorted.slice(0, 3));
      setTopLosers(sorted.slice(-3).reverse());
      
      // 按成交量排序
      const volumeSorted = [...marketStats].sort((a, b) => b.quoteVolume - a.quoteVolume);
      setTopVolume(volumeSorted.slice(0, 3));
    }
  }, [marketStats]);

  return (
    <Container>
      <HeroSection>
        <HeroTitle>交易数字资产的最佳平台</HeroTitle>
        <HeroSubtitle>
          安全可靠的数字资产交易平台，为您提供专业的交易服务，支持多种数字货币交易，实时行情数据，便捷的资产管理。
        </HeroSubtitle>
        
        {!isAuthenticated && (
          <CTAButtons>
            <PrimaryButton to="/register">免费注册</PrimaryButton>
            <SecondaryButton to="/login">已有账户？登录</SecondaryButton>
          </CTAButtons>
        )}
      </HeroSection>
      
      <div>
        <CardTitle>我们的特色</CardTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>安全保障</FeatureTitle>
            <FeatureDescription>
              采用银行级加密技术和多重安全机制，保障您的资产安全，让您交易无忧。
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>高速交易</FeatureTitle>
            <FeatureDescription>
              高性能交易引擎，支持每秒百万级交易处理，毫秒级成交速度。
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💹</FeatureIcon>
            <FeatureTitle>丰富交易对</FeatureTitle>
            <FeatureDescription>
              支持上百种数字货币交易对，满足不同用户的多样化交易需求。
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>专业图表</FeatureTitle>
            <FeatureDescription>
              提供专业K线图表和技术分析工具，助您把握市场动向。
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </div>
      
      <div>
        <CardTitle>市场概况</CardTitle>
        <StatsGrid>
          {isLoading ? (
            <StatCard>
              <StatLabel>加载中...</StatLabel>
            </StatCard>
          ) : (
            <>
              {topGainers.map(stat => (
                <StatCard key={`gain-${stat.symbol}`}>
                  <StatLabel>领涨 - {stat.symbol}</StatLabel>
                  <StatValue>${stat.lastPrice}</StatValue>
                  <StatChange positive={true}>
                    +{formatPercent(stat.priceChangePercent)}
                  </StatChange>
                </StatCard>
              ))}
              
              {topLosers.map(stat => (
                <StatCard key={`loss-${stat.symbol}`}>
                  <StatLabel>领跌 - {stat.symbol}</StatLabel>
                  <StatValue>${stat.lastPrice}</StatValue>
                  <StatChange positive={false}>
                    {formatPercent(stat.priceChangePercent)}
                  </StatChange>
                </StatCard>
              ))}
              
              {topVolume.map(stat => (
                <StatCard key={`vol-${stat.symbol}`}>
                  <StatLabel>成交量 - {stat.symbol}</StatLabel>
                  <StatValue>${formatNumberWithCommas(stat.quoteVolume)}</StatValue>
                </StatCard>
              ))}
            </>
          )}
        </StatsGrid>
      </div>
      
      {!isAuthenticated && (
        <CTASection>
          <CardTitle>立即开始交易</CardTitle>
          <p>只需简单几步，即可开始您的数字资产交易之旅</p>
          <CTAButtons>
            <PrimaryButton to="/register">注册账户</PrimaryButton>
          </CTAButtons>
        </CTASection>
      )}
    </Container>
  );
};

export default Home; 