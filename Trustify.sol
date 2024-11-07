// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Trustify {
    struct Review {
        address reviewer;
        string comment;
        uint8 rating;
        uint256 timestamp;
    }

    struct Freelancer {
        string name;
        Review[] reviews;
        uint8 averageRating;
    }

    mapping(address => Freelancer) public freelancers;

    // Add a review for a freelancer
    function addReview(address _freelancer, string memory _comment, uint8 _rating) public {
        require(_rating >= 1 && _rating <= 5, "Rating must be between 1 and 5");

        freelancers[_freelancer].reviews.push(
            Review({
                reviewer: msg.sender,
                comment: _comment,
                rating: _rating,
                timestamp: block.timestamp
            })
        );

        // Update average rating
        uint totalRating = 0;
        for (uint i = 0; i < freelancers[_freelancer].reviews.length; i++) {
            totalRating += freelancers[_freelancer].reviews[i].rating;
        }
        freelancers[_freelancer].averageRating = uint8(totalRating / freelancers[_freelancer].reviews.length);
    }

    // Fetch freelancer reviews
    function getReviews(address _freelancer) public view returns (Review[] memory) {
        return freelancers[_freelancer].reviews;
    }
}
