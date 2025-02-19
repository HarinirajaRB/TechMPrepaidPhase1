// scripts.js

document.addEventListener("DOMContentLoaded", function() {
    // Sample Plan Data
    const plans = [
      { id: 1, name: "₹299 Plan", description: "1.5GB/day, 28 days validity", price: 299, validity: 28 },
      { id: 2, name: "₹499 Plan", description: "2GB/day, 56 days validity", price: 499, validity: 56 },
      { id: 3, name: "₹699 Plan", description: "3GB/day, 84 days validity", price: 699, validity: 84 },
      { id: 4, name: "₹799 Plan", description: "Unlimited Data, 56 days", price: 799, validity: 56 },
      { id: 5, name: "₹199 Plan", description: "1GB/day, 28 days validity", price: 199, validity: 28 },
      { id: 6, name: "₹599 Plan", description: "2GB/day, 84 days validity", price: 599, validity: 84 }
    ];
  
    const planGrid = document.getElementById("planGrid");
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    const validitySelect = document.getElementById("validitySelect");
  
    // Function to load plans dynamically
    function loadPlans(plans) {
      planGrid.innerHTML = "";
      plans.forEach(plan => {
        const planCard = `
          <div class="col-md-4 plan-card mb-4" data-price="${plan.price}" data-validity="${plan.validity}">
            <div class="card shadow">
              <div class="card-body">
                <h5 class="card-title">${plan.name}</h5>
                <p class="card-text">${plan.description}</p>
                <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#planDetailsModal" onclick="showPlanDetails(${plan.id})">Plan Details</button>
                <button class="btn btn-success select-plan">Select</button>
              </div>
            </div>
          </div>
        `;
        planGrid.innerHTML += planCard;
      });
    }
  
    // Function to show plan details in modal
    window.showPlanDetails = function(planId) {
      const plan = plans.find(p => p.id === planId);
      document.getElementById("modalPlanDetails").textContent = `${plan.name}: ${plan.description}`;
    }
  
    // Filter plans by price and validity
    document.getElementById("applyFilters").addEventListener("click", function() {
      const price = priceRange.value;
      const validity = validitySelect.value;
  
      const filteredPlans = plans.filter(plan => plan.price <= price && plan.validity == validity);
      loadPlans(filteredPlans);
    });
  
    // Update price display when slider is changed
    priceRange.addEventListener("input", function() {
      priceValue.textContent = priceRange.value;
    });
  
    // Initially load all plans
    loadPlans(plans);
  
    // View All button
    document.getElementById("viewAllBtn").addEventListener("click", function() {
      loadPlans(plans); // Load all plans when clicked
    });
  });
  