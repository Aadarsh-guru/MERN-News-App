import { createContext, useContext, useState } from 'react';

const DataContext = createContext(null);

export const useData = () => {
    return useContext(DataContext);
}

const DataProvider = ({ children }) => {

    const [openSideBar, setOpenSideBar] = useState(false)
    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [openUpdateUserDialog, setOpenUpdateUserDialog] = useState(false)

    return (
        <DataContext.Provider value={{
            openSideBar, setOpenSideBar,
            openLoginDialog, setOpenLoginDialog,
            openUpdateUserDialog, setOpenUpdateUserDialog
        }} >
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;