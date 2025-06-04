const Header = () => {
    return ( 
        <div className="header2">
            <div className="d1">
                <div className="logo"><img src="icon.svg" alt="Logo"/></div>
                <div className="logo">IntellectUp</div>
            </div>
            <div className="links">
                <a href=""> Home</a>
                <a href=""> New Chat</a>         
            </div>
            <div className="login">
                <button>Login</button>
            </div>
        </div>
     );
}
 
export default Header;