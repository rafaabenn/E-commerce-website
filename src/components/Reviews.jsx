import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { StarFill, Star } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

export default function Reviews({ isLoggedIn }) {
    const [reviews, setReviews] = useState([
        { id: 1, name: "John Doe", rating: 5, comment: "Great product! Exactly as described.", date: "2023-12-01" },
        { id: 2, name: "Jane Smith", rating: 4, comment: "Good quality but shipping took longer than expected.", date: "2023-11-28" }
    ]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const navigate = useNavigate();

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        const review = {
            id: reviews.length + 1,
            name: user.username,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split('T')[0]
        };
        setReviews([...reviews, review]);
        setNewReview({ rating: 5, comment: '' });
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index}>
                {index < rating ? <StarFill className="text-warning" /> : <Star className="text-warning" />}
            </span>
        ));
    };

    return (
        <div className="bg-light p-4 rounded-3 shadow-sm">
            <h3 className="fw-bold mb-4">Customer Reviews</h3>
            
            <div className="mb-5">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-3 rounded-3 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="fw-bold mb-0">{review.name}</h6>
                            <small className="text-muted">{review.date}</small>
                        </div>
                        <div className="mb-2">
                            {renderStars(review.rating)}
                        </div>
                        <p className="mb-0">{review.comment}</p>
                    </div>
                ))}
            </div>

            {isLoggedIn ? (
                <div className="bg-white p-4 rounded-3">
                    <h5 className="fw-bold mb-3">Write a Review</h5>
                    <Form onSubmit={handleReviewSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Rating</Form.Label>
                            <Form.Select
                                value={newReview.rating}
                                onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                            >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Review</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newReview.comment}
                                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit Review
                        </Button>
                    </Form>
                </div>
            ) : (
                <div className="bg-white p-3 rounded-3 text-center">
                    <p className="mb-2">Please login to write a review</p>
                    <Button 
                        variant="primary"
                        onClick={() => navigate('/login')}
                    >
                        Login to Review
                    </Button>
                </div>
            )}
        </div>
    );
}