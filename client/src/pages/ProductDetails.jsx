import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import StarRating from '../components/StarRating';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await res.json();
                setProduct(data);

                const reviewsRes = await fetch(`http://localhost:5000/api/products/${id}/reviews`);
                setReviews(await reviewsRes.json());
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="p-20 text-center">Loading...</div>;
    if (!product) return <div className="p-20 text-center">Product not found</div>;

    return (
        <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
            <button onClick={() => navigate(-1)} className="mb-8 text-gray-500 hover:text-black">← Back</button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details Section */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-2xl font-bold">₹{product.price}</span>
                        <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span>{product.rating_average?.toFixed(1) || 'New'}</span>
                            <span className="text-gray-400">({product.rating_count} reviews)</span>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4 mb-8">
                        {product.inventory_count > 0 ? (
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <span className="text-red-500 font-bold border border-red-500 px-6 py-2 rounded">
                                Out of Stock
                            </span>
                        )}
                        <div className="text-sm text-gray-500">
                            {product.inventory_count < 10 && product.inventory_count > 0 && `Only ${product.inventory_count} left!`}
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="border-t pt-6 space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between max-w-xs">
                            <span>Category:</span>
                            <span className="font-medium text-black">{product.category}</span>
                        </div>
                        <div className="flex justify-between max-w-xs">
                            <span>Spice Leve:</span>
                            <span className="font-medium text-black">{product.isSpicy ? 'Spicy 🌶️' : 'Mild'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-20 max-w-3xl">
                <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

                {user && (
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h3 className="font-bold mb-4">Write a Review</h3>
                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            const rating = Number(e.target.rating.value);
                            const comment = e.target.comment.value;

                            const res = await fetch(`http://localhost:5000/api/products/${id}/reviews`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-auth-token': localStorage.getItem('token')
                                },
                                body: JSON.stringify({ rating, comment })
                            });

                            if (res.ok) {
                                alert('Review submitted!');
                                window.location.reload();
                            } else {
                                alert('Failed to submit review');
                            }
                        }}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm text-gray-600">Rating</label>
                                <select name="rating" className="p-2 border rounded w-full">
                                    <option value="5">5 - Excellent</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="3">3 - Good</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="1">1 - Poor</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm text-gray-600">Comment</label>
                                <textarea name="comment" required className="p-2 border rounded w-full" rows="3"></textarea>
                            </div>
                            <button type="submit" className="bg-black text-white px-6 py-2 rounded">Submit Review</button>
                        </form>
                    </div>
                )}

                {reviews.length === 0 ? (
                    <p className="text-gray-500 italic">No reviews yet. Be the first to try it!</p>
                ) : (
                    <div className="space-y-8">
                        {reviews.map(review => (
                            <div key={review._id} className="border-b pb-8">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="font-bold">{review.user?.name || 'Anonymous user'}</h4>
                                        <div className="text-xs text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <StarRating rating={review.rating} readOnly={true} />
                                </div>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
