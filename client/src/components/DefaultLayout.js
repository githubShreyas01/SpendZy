import React from "react";

function DefaultLayout({ children }) {
    return (
        <div className="layout">
            <div className="sidebar">Sidebar</div>
            <div className="body">
                <div className="header flex justify-between items-center">
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>
    )
};

export default DefaultLayout;