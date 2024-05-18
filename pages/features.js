import Header from '../components/header'
import Footer from '../components/footer'
import Link from 'next/link';

export default function UploadForm() {



    return (
        <>
        <Header />

        <div className="container-fluid">
        <div className='row'>


            <div className="widget-stat card bg-warning">

                        <div className="card-body p-4">
                            <div className="media">
                                <span className="me-3">
                                    <i className="la la-book"></i>
                                </span>
                                <div className="media-body text-white">
                                    <p className="mb-1 text-white">Cook something new</p>
                                    <h3 className="text-white">Recipe</h3>
                                    <small>Reach your goals faster</small>
                                </div>
                            </div>
                        </div>
            </div>

            <Link href='/reports' className="widget-stat card bg-primary">

                        <div className="card-body p-4">
                            <div className="media">
                                <span className="me-3">
                                <i class="las la-sort-amount-up"></i>
                                </span>
                                <div className="media-body text-white">
                                    <p className="mb-1 text-white">Track your health better</p>
                                    <h3 className="text-white">Report</h3>
                                    <small>Understand your routine</small>
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
