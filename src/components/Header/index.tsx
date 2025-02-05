import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from '../../assets/logo.svg';
import { TransactionModal } from "../TransactionModal";

export function Header(){
  return(
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="logo"/>
        {/* modal do radix */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova Transacao</NewTransactionButton>
          </Dialog.Trigger>

            <TransactionModal/>
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}