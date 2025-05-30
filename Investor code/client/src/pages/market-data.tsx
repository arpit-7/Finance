import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, RefreshCw, Clock } from "lucide-react";

interface MarketItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdate?: string;
  timestamp?: number;
}

interface CurrencyItem {
  symbol: string;
  rate: number;
  change?: number;
  changePercent?: number;
  lastUpdate: string;
}

export default function MarketData() {
  const { data: indianData, isLoading: indianLoading, error: indianError } = useQuery({
    queryKey: ["/api/market-data/indian"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: usData, isLoading: usLoading, error: usError } = useQuery({
    queryKey: ["/api/market-data/us"],
    refetchInterval: 30000,
  });

  const { data: currencyData, isLoading: currencyLoading, error: currencyError } = useQuery({
    queryKey: ["/api/market-data/currency"],
    refetchInterval: 60000, // Refresh every minute
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const formatChange = (change: number, changePercent: number) => {
    const isPositive = change >= 0;
    const color = isPositive ? "text-green-600" : "text-red-600";
    const symbol = isPositive ? "+" : "";
    
    return (
      <span className={color}>
        {symbol}{change.toFixed(2)} ({symbol}{changePercent.toFixed(2)}%)
      </span>
    );
  };

  const MarketCard = ({ 
    title, 
    icon, 
    data, 
    isLoading, 
    error, 
    type = "market" 
  }: { 
    title: string; 
    icon: React.ReactNode; 
    data: any; 
    isLoading: boolean; 
    error: any;
    type?: "market" | "currency";
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
          {isLoading && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-600 text-sm">
            Failed to load data. Please try again later.
          </div>
        ) : (
          <div className="space-y-4">
            {type === "market" ? (
              <>
                {/* Display market data in specific order for Indian markets */}
                {title === "Indian Markets" ? (
                  <>
                    {/* NIFTY 50 */}
                    {data?.nifty && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.nifty.symbol}</span>
                        <div className="text-right">
                          <div className="font-bold">{formatPrice(data.nifty.price)}</div>
                          <div className="text-sm">{formatChange(data.nifty.change, data.nifty.changePercent)}</div>
                          {data.nifty.lastUpdate && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {data.nifty.lastUpdate}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* SENSEX */}
                    {data?.sensex && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.sensex.symbol}</span>
                        <div className="text-right">
                          <div className="font-bold">{formatPrice(data.sensex.price)}</div>
                          <div className="text-sm">{formatChange(data.sensex.change, data.sensex.changePercent)}</div>
                          {data.sensex.lastUpdate && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {data.sensex.lastUpdate}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* NIFTY Bank */}
                    {data?.niftyBank && (
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.niftyBank.symbol}</span>
                        <div className="text-right">
                          <div className="font-bold">{formatPrice(data.niftyBank.price)}</div>
                          <div className="text-sm">{formatChange(data.niftyBank.change, data.niftyBank.changePercent)}</div>
                          {data.niftyBank.lastUpdate && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {data.niftyBank.lastUpdate}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* For other markets (US), use the original logic */
                  Object.entries(data || {})
                    .filter(([key]) => !['refreshedAt', 'debug'].includes(key))
                    .map(([key, item]: [string, any]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="font-medium">{item.symbol}</span>
                        <div className="text-right">
                          {item.price !== undefined && item.price !== null ? (
                            <>
                              <div className="font-bold">{formatPrice(item.price)}</div>
                              {item.change !== undefined && item.changePercent !== undefined ? (
                                <div className="text-sm">{formatChange(item.change, item.changePercent)}</div>
                              ) : (
                                <div className="text-sm text-gray-500">Data unavailable</div>
                              )}
                              {item.lastUpdate && (
                                <div className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.lastUpdate}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="text-sm text-gray-500">Loading...</div>
                          )}
                        </div>
                      </div>
                    ))
                )}
                {data?.refreshedAt && (
                  <div className="text-xs text-gray-500 flex items-center gap-1 mt-2 pt-2 border-t">
                    <Clock className="h-3 w-3" />
                    Last updated: {data.refreshedAt}
                  </div>
                )}
              </>
            ) : (
              /* Currency data */
              Object.entries(data || {})
                .filter(([key]) => !['refreshedAt', 'debug'].includes(key))
                .map(([key, item]: [string, any]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="font-medium">{item.symbol}</span>
                    <div className="text-right">
                      {item.rate !== undefined && item.rate !== null ? (
                        <>
                          <div className="font-bold">₹{item.rate.toFixed(2)}</div>
                          {item.change !== undefined && item.changePercent !== undefined && (
                            <div className="text-sm">{formatChange(item.change, item.changePercent)}</div>
                          )}
                          {item.lastUpdate && (
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.lastUpdate}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-sm text-gray-500">Loading...</div>
                      )}
                    </div>
                  </div>
                ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Data</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Live market data and financial metrics - Updated every 30 seconds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MarketCard
            title="Indian Markets"
            icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
            data={indianData}
            isLoading={indianLoading}
            error={indianError}
            type="market"
          />

          <MarketCard
            title="US Markets"
            icon={<TrendingDown className="h-5 w-5 text-purple-600" />}
            data={usData}
            isLoading={usLoading}
            error={usError}
            type="market"
          />

          <MarketCard
            title="Currency Rates"
            icon={<RefreshCw className="h-5 w-5 text-green-600" />}
            data={currencyData}
            isLoading={currencyLoading}
            error={currencyError}
            type="currency"
          />
        </div>

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Indian Markets</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    NIFTY 50 represents the top 50 companies by market capitalization on the NSE.
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    SENSEX tracks 30 well-established companies listed on the BSE.
                  </p>
                  <p className="text-sm text-gray-600">
                    NIFTY Bank focuses on the banking sector with 12 most liquid banking stocks.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-purple-600">US Markets</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    S&P 500 (SPY ETF) tracks the 500 largest US companies by market cap.
                  </p>
                  <p className="text-sm text-gray-600">
                    NASDAQ (QQQ ETF) focuses on technology and growth companies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
