import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BAbutton from '../component/button';
import { useNavigate } from 'react-router-dom';


function BookDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://book-library-psi-six.vercel.app/bookpost/${id}`);
            console.log(response.data.data)
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Book not found</div>;
    }

    return (
        <section className='max-w-7xl mx-auto lg:px-0 px-2 mt-10'>

            <div className='bg-[#ffffff] shadow-md p-4 rounded-[10px]'>

                <div className='max-w-7xl mx-auto xl-px-0 px-2'>
                    <div className='grid grid-cols-12 gap-4 mt-10'>
                        <div className="col-span-12">
                            <h1 className='radikal-bold'>{product.tittle}</h1>
                            <p className='radikal-bold text-[20px]'><span>Rs. </span>{product.price}</p>
                            <p className=''>{product.short_description}</p>
                            <p className=''>{product.long_description}</p>
                        </div>

                        <div className="md:col-span-6 col-span-12">
                            <p><span className='rdaikal-medium'>Kindle Url: </span>{product.kindle_url}</p>
                            <p><span className='rdaikal-medium'>Paper Back Url:</span>{product.paper_back_url}</p>
                            <div className=''>
                                <img className='md:mb-0 mb-4' src={product.front_image} alt={product.tittle} />
                                <img className='md:hidden block' src={product.back_image} alt={product.tittle} />
                            </div>
                        </div>

                        <div className="md:col-span-6 col-span-12">
                            <p className=''><span className='rdaikal-medium'>Amazon Url: </span>{product.amazon_url}</p>
                            <p><span className='rdaikal-medium'>Audio Book Price: </span>{product.audio_book_price}</p>
                            <img className='md:block hidden' src={product.back_image} alt={product.tittle} />
                        </div>

                        <div className="col-span-12">
                            <BAbutton onClick={() => navigate('../admindashboard/book')} label="Back" />
                        </div>

                    </div>

                </div>
            </div>
        </section>

    );
}

export default BookDetails;
