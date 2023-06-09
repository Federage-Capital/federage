import Link from "next/link"
import { Logo } from "@/components/logo-federage"
import Image from "next/image"
import { PreviewAlert } from "@/components/preview-alert"
import Menu2 from "components/menu";
import ToggleLayout from "components/ToggleLayout";
import { useState } from 'react';
import Hamburger from "components/Hamburger";
import { Footer } from "components/footer";



export function Layout({ children }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

  return (
    <>
      <PreviewAlert />
      <div className="max-w-screen-md px-6 mx-auto">
        <header>
          <div className="container flex items-center justify-between pb-6 mx-auto">
            <Link href="/" passHref>
              <a className="text-2xl imglogofederage font-semibold no-underline">

              <Image src="/federage-logo.svg" height={100} width={400}  />

              </a>

            </Link>

            <div className="navigation my-10">


            <ul>
            <Menu2 />
            <div className="lune" >  <ToggleLayout />
</div>
            </ul>

                    <div className="hamburger" onClick={toggleHamburger}>
                        <Hamburger isOpen={hamburgerOpen}/>
                    </div>

            </div>

                        <style jsx>{`

                            .navigation{
                                width: 100%;
                                height: 50px;
                            }


                            .navigation ul{
                                display:flex;
                                flex-wrap: wrap;
                                float: right;
                                margin: 0px;
                                padding: 0px;
                                overflow: hidden;
                            }
                            .navigation ul li{
                                list-style-type: none;
                                padding-right: 10px;

                            }



                            .hamburger{
                                display: none;
                                z-index: 6;
                            }


                            @media (max-width: 767px){

                                .hamburger{
                                    display:block;

                                    z-index: 6;
                                }



                                .navigation ul{
                                    display: ${hamburgerOpen ? 'inline' : 'none'};
                                    background-color: white;
                                    height: 100vh;
                                    width: 100vw;
                                    margin-top: 50px;
                                    position: fixed;


                                }

                                .lune2{
                                      display: ${hamburgerOpen ? 'inline' : 'none'};
                                      background-color: white;
                                      height: 100vh;
                                      width: 100vw;
                                      margin-top: 50px;
                                      position: fixed;


                                  }
                                  .lune2{
                                        display: ${!hamburgerOpen ? 'inline' : 'none'};
                                        background-color: red;
                                        height: 100vh;
                                        width: 100vw;
                                        margin-top: 50px;
                                        position: fixed;


                                    }
                            }



                        `}</style>






          </div>
        </header>
        <main className="container py-2 mx-auto">{children}</main>
      </div>
          <Footer />


    </>
  )
}
