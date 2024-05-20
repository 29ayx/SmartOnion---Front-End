import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link';

export default function UploadForm() {



    return (
        <>
        <Header title="Shared Feature"/>

        <div className="container-fluid ">
        <div className='row'>


            <Link href='/newRecipe' className="widget-stat w-80 card bg-warning">

                        <div className="card-body p-4">
                            <div className="media">
                                <span className="me-3">
                                    <i className="la la-book"></i>
                                </span>
                                <div className="media-body text-white">
                                    <p className="mb-1 text-white">Cook something new</p>
                                    <h3 className="text-white">Recipe</h3>

                                </div>
                            </div>
                        </div>
            </Link>

            <Link href='/reports' className="widget-stat card bg-primary">

                        <div className="card-body p-4">
                            <div className="media">
                                <span className="me-3">
                                <i className="las la-sort-amount-up"></i>
                                </span>
                                <div className="media-body text-white">
                                    <p className="mb-1 text-white">Track your health better</p>
                                    <h3 className="text-white">Report</h3>
                                </div>
                            </div>
                        </div>
            </Link>
            <Link href='/shoppinglist' className="widget-stat card bg-secondary">

                        <div className="card-body p-4">
                            <div className="media">
                                <span className="me-3">
                                <i className="las la-shopping-cart"></i>
                                </span>
                                <div className="media-body text-white">
                                    <p className="mb-1 text-white">Easy way to manage shopping</p>
                                    <h3 className="text-white">Shopping List</h3>
                                </div>
                            </div>
                        </div>
            </Link>


           


      
        </div>
	</div>


        <Footer/>
        
        </>
    );
}
