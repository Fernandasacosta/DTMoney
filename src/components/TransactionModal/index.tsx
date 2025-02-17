
import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const TransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(['income', 'outcome']),
})

type TransactionFormInputs = z.infer<typeof TransactionFormSchema>;

export function TransactionModal(){
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<TransactionFormInputs>({
    resolver: zodResolver(TransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: TransactionFormInputs){
    await new Promise(resolve => setTimeout(resolve,2000));

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

            <TransactionType>
              <TransactionTypeButton variant="income" value="income">
                <ArrowCircleUp size={24}/>
                Entrada
              </TransactionTypeButton>
              <TransactionTypeButton variant="outcome" value="outcome">
                <ArrowCircleDown size={24}/>
                Saida
              </TransactionTypeButton>


            </TransactionType>

            <button type="submit" disabled={isSubmitting}>Cadastrar</button>
          </form>
    
         
        </Content>  
      </Overlay>
    </Dialog.Portal>
  )
}