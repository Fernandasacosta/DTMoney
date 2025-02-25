
import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const TransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type TransactionFormInputs = z.infer<typeof TransactionFormSchema>;

export function TransactionModal(){
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  );

  const { 
    control,
    register, 
    handleSubmit,
    formState: { isSubmitting },
    reset
  } = useForm<TransactionFormInputs>({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      type:'income'
    }
  })

  async function handleCreateNewTransaction(data: TransactionFormInputs){
     const { description, price, category, type } = data;

     await createTransaction({
      description,
      price,
      category,
      type,
     })

  
    reset();
    console.log(data);
  }

  return(
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova Trasnsacao</Dialog.Title>

          <CloseButton>
            <X size={24}/>
          </CloseButton>
            
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input 
              type="text" 
              placeholder="Descricao" 
              required 
              {...register('description')}
            />
            <input 
              type="number" 
              placeholder="Preco" 
              required
              {...register('price', { valueAsNumber: true })}
            />
            <input 
              type="text" 
              placeholder="Categoria" 
              required
              {...register('category')}
            />

            <Controller
              control={control}
              name="type"
                render={({ field }) => {
                  console.log(field)
             

                return(
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24}/>
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24}/>
                      Saida
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />

            <button type="submit" disabled={isSubmitting}>Cadastrar</button>
          </form>
    
         
        </Content>  
      </Overlay>
    </Dialog.Portal>
  )
}