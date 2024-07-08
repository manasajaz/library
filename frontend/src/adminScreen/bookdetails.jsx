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
            const response = await axios.get(`http://localhost:8000/bookpost/${id}`);
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

                        <div className="md:col-span-6 col-span-12">
                            <h1 className='radikal-bold'>{product.tittle}</h1>
                            <p className=''>{product.short_description}</p>
                            <p className=''>{product.long_description}</p>
                            <p className=''><span className='rdaikal-medium'>Paper Back Url:</span>{product.paper_back_url}</p>
                            <img src={product.front_image} alt={product.tittle} />
                        </div>

                        <div className="md:col-span-6 col-span-12">
                            <h1 className='md:block hidden'></h1>
                            <p className=''><span className='rdaikal-medium'>Amazon Url:</span>{product.amazon_url}</p>
                            <p><span className='rdaikal-medium'>Audio Book Price:</span>{product.audio_book_price}</p>
                            <p className=''><span className='rdaikal-medium'>Kindle Url:</span>{product.kindle_url}</p>
                            <img src={product.back_image} alt={product.tittle} />
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
