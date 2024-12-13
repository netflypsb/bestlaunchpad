import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { SelectedPresale } from "@/types/presale";

const formSchema = z.object({
  amounts: z.array(z.object({
    presaleId: z.number(),
    amount: z.string().refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Amount must be a positive number")
  }))
});

const Purchase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(false);
  const selectedPresales = location.state?.selectedPresales as SelectedPresale[] || [];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amounts: selectedPresales.map(presale => ({
        presaleId: presale.id,
        amount: ""
      }))
    }
  });

  if (!selectedPresales.length) {
    return (
      <div className="container mx-auto px-4 pt-24">
        <Alert>
          <AlertDescription>
            No presales selected. Please select presales from the presales page.
          </AlertDescription>
        </Alert>
        <Button className="mt-4" onClick={() => navigate("/presales")}>
          Go to Presales
        </Button>
      </div>
    );
  }

  const calculateTotal = (values: z.infer<typeof formSchema>) => {
    return values.amounts.reduce((total, current) => {
      return total + (parseFloat(current.amount) || 0);
    }, 0);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Purchase submitted:", values);
    const total = calculateTotal(values);
    toast.success("Purchase request submitted successfully!");
    setShowSummary(true);
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-3xl font-bold mb-8">Purchase Presales</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {selectedPresales.map((presale, index) => (
            <Card key={presale.id}>
              <CardHeader>
                <CardTitle>{presale.name} ({presale.tokenSymbol})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <p>ETH Contract: {presale.ethereumContractAddress}</p>
                  {presale.bscContractAddress && (
                    <p>BSC Contract: {presale.bscContractAddress}</p>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name={`amounts.${index}.amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Amount (ETH)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}

          {showSummary && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Transaction Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPresales.map((presale, index) => (
                  <div key={presale.id} className="flex justify-between">
                    <span>{presale.name}</span>
                    <span>{form.getValues().amounts[index].amount} ETH</span>
                  </div>
                ))}
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>{calculateTotal(form.getValues())} ETH</span>
                </div>
              </CardContent>
            </Card>
          )}

          <CardFooter className="flex justify-end">
            <Button type="submit">
              Confirm Purchase
            </Button>
          </CardFooter>
        </form>
      </Form>
    </div>
  );
};

export default Purchase;