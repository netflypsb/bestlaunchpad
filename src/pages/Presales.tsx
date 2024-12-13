const Presales = () => {
  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-3xl font-bold mb-8">Active Presales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border bg-card/50 backdrop-blur-sm">
          <p className="text-lg font-semibold mb-2">No active presales</p>
          <p className="text-muted-foreground">Check back soon for new opportunities!</p>
        </div>
      </div>
    </div>
  );
};

export default Presales;