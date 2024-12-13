import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { type Presale, type SelectedPresale } from "@/types/presale";

const presaleData: Presale[] = [
  {
    id: 1,
    name: "Wall Street Pepe",
    tokenSymbol: "WEPE",
    website: "https://wallstreetpepe.com",
    ethereumContractAddress: "0x628fda7a32b88834244a3f170ad0ae14e0ccb7b4",
    bscContractAddress: "0x6073ed0cfc2d50ff4e52a82de307aedc8ebb6a96"
  },
  {
    id: 2,
    name: "Crypto All-Stars",
    tokenSymbol: "STARS",
    website: "https://cryptoallstars.io",
    ethereumContractAddress: "0x1e5e3649981a3a14cd99b85a33e0df44cd398a57"
  },
  {
    id: 3,
    name: "Flockerz",
    tokenSymbol: "FLOCK",
    website: "https://flockerz.io",
    ethereumContractAddress: "0xb33d999469a7e6b9ebc25a3a05248287b855ed46",
    bscContractAddress: "0x822c90db1958c20d58b5615a2cfdf2e80ad00b3e"
  },
  {
    id: 4,
    name: "Rexas Finance",
    tokenSymbol: "RXS",
    website: "https://rexasfinance.com",
    ethereumContractAddress: "0x9eAeBd7E73D97E78c77fAB743e6FFA1b550e224c"
  }
];

const Presales = () => {
  const navigate = useNavigate();
  const [selectedPresales, setSelectedPresales] = useState<SelectedPresale[]>(
    presaleData.map(presale => ({ ...presale, selected: false }))
  );

  const handleSelect = (id: number) => {
    setSelectedPresales(prev =>
      prev.map(presale =>
        presale.id === id
          ? { ...presale, selected: !presale.selected }
          : presale
      )
    );
  };

  const handlePurchase = () => {
    const selected = selectedPresales.filter(p => p.selected);
    toast.success(`Proceeding to purchase ${selected.length} presales`);
    navigate("/purchase", { state: { selectedPresales: selected } });
  };

  const selectedCount = selectedPresales.filter(p => p.selected).length;

  return (
    <div className="container mx-auto px-4 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Active Presales</h1>
        {selectedCount > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {selectedCount} presale{selectedCount !== 1 ? "s" : ""} selected
            </span>
            <Button onClick={handlePurchase}>
              Proceed to Purchase
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedPresales.map((presale) => (
          <Card key={presale.id} className="backdrop-blur-sm bg-card/50">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{presale.name}</span>
                <Badge variant="secondary">{presale.tokenSymbol}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <a
                  href={presale.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crypto-primary hover:text-crypto-secondary transition-colors"
                >
                  Visit Website
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Contract Addresses:</p>
                <div className="space-y-1">
                  <p className="text-xs break-all">
                    ETH: {presale.ethereumContractAddress}
                  </p>
                  {presale.bscContractAddress && (
                    <p className="text-xs break-all">
                      BSC: {presale.bscContractAddress}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSelect(presale.id)}
                variant={presale.selected ? "default" : "outline"}
                className="w-full"
              >
                {presale.selected ? "Selected" : "Select for Purchase"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Presales;