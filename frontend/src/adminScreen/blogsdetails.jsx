import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BAbutton from '../component/button';
import { useNavigate } from 'react-router-dom';


function BlogsDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://book-library-psi-six.vercel.app/blogspost/${id}`);
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
                        <div className="col-span-12 h-full">
                            <h1 className='radikal-bold'>{product.tittle}</h1>
                            {/* <p className='radikal-bold text-[20px]'><span>Rs. </span>{product.price}</p> */}
                            <p className=''>{product.short_description}</p>
                            <p className=''>{product.long_description}</p>
                            <div className='flex md:flex-row md:flex-no-wrap flex-wrap justify-between gap-2'>
                                <img src={product.image_1} className='my-4 mx-auto' alt={product.image_1} />
                                <img src={product.image_2} className='my-4 mx-auto' alt={product.image_2} />
                                <img src={product.image_3} className='my-4 mx-auto' alt={product.image_3} />
                            </div>
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

export default BlogsDetails;
