import { AccountSettingsCards,ChangePasswordCard,DeleteAccountCard} from "@daveyplate/better-auth-ui"


const Settings = () => {
  return (
    <div className="w-full p-4 flex justify-center items-center min-h-[90vh] flex-col gap-6 py-12">
      <AccountSettingsCards
       classNames={{
        card:{
            base:'bg-card ring ring-border max-w-xl mx-auto',
            footer:'bg-card ring ring-border'
        }
       }}
      />
      <div className="w-full">
            <ChangePasswordCard 
            classNames={
                { 
            base:'bg-card ring ring-border max-w-xl mx-auto',
            footer:'bg-card ring ring-border'
       }} />
        </div>
         <div className="w-full">
            <DeleteAccountCard
            classNames={
                {
            base:'bg-card ring ring-border max-w-xl mx-auto',
            footer:'bg-card ring ring-border'
       }}/>
            
        </div>
    </div>
  )
}

export default Settings
