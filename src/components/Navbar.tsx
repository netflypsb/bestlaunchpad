import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { toast } = useToast();

  const handleConnect = async () => {
    console.log("Connect Wallet button clicked");

    if (!connectors.length) {
      toast({
        title: "No Connectors",
        description: "No wallet connectors found.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await connectAsync({ connector: connectors[0] });
      console.log("Wallet Connected", result);
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      });
    } catch (error) {
      console.error("Connection failed", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = async () => {
    await disconnectAsync();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-crypto-primary">
              CryptoPresales
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-foreground/80 hover:text-foreground">
                Home
              </Link>
              <Link to="/presales" className="text-foreground/80 hover:text-foreground">
                Presales
              </Link>
            </div>
          </div>
          <div>
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-foreground/80">
                  {address && truncateAddress(address)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleConnect}
                className="bg-crypto-primary hover:bg-crypto-accent text-white"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
