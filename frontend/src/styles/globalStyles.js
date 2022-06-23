import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { v } from "./variables";


export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        margin: 0;
        box-sizing: border-box;
    }

    body {
        background: ${({ theme }) => theme.bg2};
        color: ${({ theme }) => theme.text};
        font-family: 'Roboto', sans-serif;
        letter-spacing: .6px;
        width: 100%;
    }
`;

// CONTAINERS
export const SContainer = styled.div`
    background: ${({ theme }) => theme.bg3};
    border-radius: ${v.borderRadius};
    padding: ${v.smSpacing};

   .header {
    padding: ${v.smSpacing};
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: ${v.borderRadiusTopHalf};
   }

   .starter {
    padding: ${v.smSpacing};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-radius: ${v.borderRadiusTopHalf};
   }

    :hover {
        box-shadow: inset 0 0 0 3px ${({ theme }) => theme.bg};
        border-radius: ${v.borderRadius};
    }
`;

export const SContainerList = styled.div`
    background: ${({ theme }) => theme.bg3};
    border-radius: ${v.borderRadius};
    
   .analytic {
    padding: ${v.smSpacing};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.bg};
    border-radius: ${v.borderRadiusTopHalf};
    
    
    .logo {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: ${v.smSpacing};
      svg {
        font-size: calc(${v.lgSpacing} * 2 );
      }
    }
  }

   .body {
    padding: ${v.smSpacing};
   }

   
`;
// /CONTAINERS


// Headings
export const H2span = styled.span`
  letter-spacing: 0.2rem;
  margin-left: 0.5rem;
`

export const SHeaderContainer = styled.div`
    align-items: right;
    justify-content: center;  
    font-size: 20px;
    display: inline-block
`
// /Headings

// LIST STYLES
export const ListContainer = styled.div`
    background: ${({ theme }) => theme.bg3};
    border-radius: ${v.borderRadius};
    padding: ${v.smSpacing};
    transition: ${v.transitionNormal};

    .inline {
      display: flex;
      justify-content: space-between;

      .index {
        width: 20%;
      float: left;
      }

      .name {
        width: 50%;
      float: left;
      }

      .count {
        width: 50%;
        float: right;
      }
      }

    :nth-child(even){
      background: ${({ theme }) => theme.bg3_even};
    }
`;

// BUTTON
export const EditButton = styled.button`
    width: 135px;
    height: 40px;
    border-radius: ${v.borderRadius};
    background: ${({ theme }) => theme.bgAlpha};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.text};
    border: 2px  ${({ theme }) => theme.bg2};
    font-size: 12px;
    cursor: pointer;
    

    :hover {
        box-shadow: inset 0 0 0 2px ${({ theme }) => theme.bgAlpha};
        font-size: 14px;
        border: 2px ${({ theme }) => theme.bg};;
        
    }
`;

export const FetchButton = styled.div`

justify-content: space-evenly;
  display: inline-flex; 
     
`;
// /BUTTON


// Input
export const Inputform = styled.input`
  width: 100%;
  margin: 8px 0;  
`;
// /Input


// /GRID STYLES
export const SGrid = styled.section`
  margin-left: 0px;
  padding: ${v.smSpacing};
  //height: 100%;
  
  .grid {
    display: grid;
    align-items: center;
    gap: ${v.mdSpacing};
    margin-top: 0px;
    width: auto;
   
    .row__one {
      display: grid;
      height: 100%;
      gap: ${v.mdSpacing};
    }
    .row__two {
      display: grid;
      gap: ${v.mdSpacing};
      height: 100%;
      width: 100%;
    }
    .row__three {
      display: grid;
      gap: ${v.mdSpacing};
      height: 100%;
    }

    .row__row {
      display: grid;
      gap: ${v.mdSpacing};
      height: 100%;

        .innerBox {
          border-radius: ${v.borderRadius};
          background: ${({ theme }) => theme.bg};
          padding: ${v.smSpacing};
          
          
         
        
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width:480px) { //Mobile
    .grid {
      .row__one{
        grid-template-columns: repeat(2, 1fr);
      }
      .row__two {
        grid-template-columns: repeat(1, 1fr);
      }
      .row__three {
        grid-template-columns: repeat(1, 1fr);
      }
      .row__row {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
  @media screen and (min-width: 481px) and (max-width:768px) { //Tablets
    .grid {
      .row__one{
        grid-template-columns: repeat(1, 1fr);
      }
      .row__two {
        grid-template-columns: repeat(1, 1fr);
      }
      .row__three {
        grid-template-columns: repeat(1, 1fr);
      }
      .row__row {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  @media screen and (min-width: 769px) and (max-width:1024px) { //laptops
    //margin-left: 0;
    
    .grid {
      .row__one{
        grid-template-columns: repeat(1, 1fr);
      }
      .row__two {
        grid-template-columns: repeat(2, 1fr);
      }
      .row__three {
        grid-template-columns: repeat(1, 1fr);
      }
      .row__row {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  @media screen and (min-width: 1025px) and (max-width:1200px) { //desktops
    //margin-left: 0;
    .grid {
      .row__one{
        grid-template-columns: repeat(1, 1fr);
      }
      .row__two {
        grid-template-columns: repeat(2, 1fr);
      }
      .row__three {
        grid-template-columns: repeat(2, 1fr);
      }
      .row__row {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
  @media screen and (min-width: 1201px) { //extra large
   // margin-left: 0;
  // height: 100%;
  // align-items: stretch;
    .grid {
      .row__one{
        grid-template-columns: repeat(1, 1fr);
      }
      .row__two {
        grid-template-columns: repeat(1, 1fr);
      }
      .row__three {
        grid-template-columns: repeat(2, 1fr);
      }
      .row__row {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
`;
// /GRID STYLES



export const Modal = styled.div`
 
.modal {
  font-size: 12px;
  height: auto;
  padding: 20px;
  background: ${({ theme }) => theme.bg};
  
}
.modal > .header {
  width: 100%;
  border-bottom: 1px solid gray;
  font-size: 18px;
  text-align: center;
  padding: 5px;
}
.modal > .content {
  width: 100%;
  padding: 10px 5px;
  display: inline-flex;
}
.modal > .actions {
  width: 100%;
  padding: 10px 5px;
  margin: auto;
  text-align: center;
}

.modal > .close {
  cursor: pointer;
  position: absolute;
  display: block;
  padding: 2px 5px;
  line-height: 20px;
  right: -10px;
  top: -10px;
  font-size: 24px;
  background: #ffffff;
  border-radius: 18px;
  border: 1px solid #cfcece;
}  
`;


export const SCover = styled.div`
 position: fixed;
 background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 30%;
  transition: opacity 500ms;
  //visibility: hidden;
  opacity: 0;
`;


export const SSection = styled.section`
  display: grid;
  //grid-template-columns: repeat(4, 1fr);
  gap: ${v.mdSpacing};
 // height: 0;

  .analytic {
    padding: 1rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    
    .logo {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: ${v.smSpacing};
      svg {
        font-size: calc(${v.lgSpacing} * 2 );
      }
    }
  }
  @media screen and  (max-width:480px) { //Mobile
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 481px) and (max-width:768px) { //Tablets
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 769px) and (max-width:1024px) { //laptops
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (min-width: 1025px) and (max-width:1200px) { //desktops
    grid-template-columns: repeat(2, 1fr);   
  }
  @media screen and (min-width: 1201px) { //extra large
    grid-template-columns: repeat(4, 1fr);  
  }
`;