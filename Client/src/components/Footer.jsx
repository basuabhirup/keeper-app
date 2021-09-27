import React from "react";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer>
            <p>Copyright © {year} Abhirup Basu</p>
        </footer>
    )
}

export default Footer; 