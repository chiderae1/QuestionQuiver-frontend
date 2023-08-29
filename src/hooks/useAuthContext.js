const { useContext } = require("react");
const { Authcontext } = require("../context/AuthContext");


const useAuthContext = () => {
    const context = useContext(Authcontext)
    if (!context) {
        throw Error('useAuthContext must be used inside Authcontext')
    }

    return context
}

export default useAuthContext;

