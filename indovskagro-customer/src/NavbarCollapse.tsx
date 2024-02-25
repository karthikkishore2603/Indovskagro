import React from "react";

export default function NavbarCollapse() {
    const [openLogin, setOpenLogin] = React.useState(false);

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
      };
    
      const handleCloseLogin = () => {
        setOpenLogin(false);
      };

      


  return (
    <>
      <div className="d-flex m-3 me-0">
        <a href="#" className="position-relative me-4 my-auto">
          <i className="fa fa-shopping-bag fa-2x"></i>
          <span
            className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
            style={{
              top: "-5px",
              left: "15px",
              height: "20px",
              minWidth: "20px",
            }}
          >
            3
          </span>
        </a>
        <a href={'login/index.html'} >
          <i className="fas fa-user fa-2x"></i>
        </a>
      </div>
    </>
  );
}
