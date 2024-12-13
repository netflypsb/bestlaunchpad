import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { isConnected } = useAccount();
  const { toast } = useToast();

  const handleExplore = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to explore presales.",
        variant: "destructive",
      });
      return;
    }
    // Navigate to presales
    window.location.href = "/presales";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[hsla(221,45%,73%,1)] to-[hsla(220,78%,29%,1)]">
      <div className="text-center space-y-6 p-8 rounded-xl bg-background/10 backdrop-blur-md">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Discover Next-Gen Crypto Projects
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Join the future of decentralized finance through our curated presales platform
        </p>
        <Button
          onClick={handleExplore}
          className="bg-crypto-primary hover:bg-crypto-accent text-white px-8 py-6 text-lg"
        >
          Explore Presales
        </Button>
      </div>
    </div>
  );
};

export default Index;