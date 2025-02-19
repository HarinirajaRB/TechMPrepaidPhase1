document.addEventListener("DOMContentLoaded", function () {
    fetch("plans.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("operator-name").textContent = data.operator;
            displayPlans(data.categories);
        })
        .catch(error => console.error("Error loading plans:", error));
});

function displayPlans(categories) {
    const container = document.getElementById("plans-container");
    container.innerHTML = ""; // Clear previous content

    Object.keys(categories).forEach(category => {
        let categorySection = document.createElement("div");
        categorySection.classList.add("mb-4");

        let categoryTitle = document.createElement("h4");
        categoryTitle.textContent = category;
        categorySection.appendChild(categoryTitle);

        let planRow = document.createElement("div");
        planRow.classList.add("row");

        categories[category].forEach(plan => {
            let col = document.createElement("div");
            col.classList.add("col-md-4", "mb-3");

            let card = document.createElement("div");
            card.classList.add("card", "shadow", "p-3");

            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">₹${plan.price} Plan</h5>
                    <p class="card-text"><strong>Data:</strong> ${plan.data}</p>
                    <p class="card-text"><strong>Validity:</strong> ${plan.validity}</p>
                    <p class="card-text"><strong>Benefits:</strong> ${plan.benefits}</p>
                    <p class="card-text"><strong>OTT:</strong> ${plan.ott}</p>
                    <button class="btn btn-secondary" onclick="viewDetails(${plan.id})" data-bs-toggle="modal" data-bs-target="#planDetailsModal">View Details</button>
                    <a href="${plan.recharge_link}" class="btn btn-success">Recharge</a>
                </div>
            `;

            col.appendChild(card);
            planRow.appendChild(col);
        });

        categorySection.appendChild(planRow);
        container.appendChild(categorySection);
    });
}

function viewDetails(planId) {
    fetch("plans.json")
        .then(response => response.json())
        .then(data => {
            let selectedPlan;
            Object.values(data.categories).flat().forEach(plan => {
                if (plan.id === planId) {
                    selectedPlan = plan;
                }
            });

            if (selectedPlan) {
                document.getElementById("plan-details-content").innerHTML = `
                    <p><strong>Plan:</strong> ₹${selectedPlan.price}</p>
                    <p><strong>Data:</strong> ${selectedPlan.data}</p>
                    <p><strong>Validity:</strong> ${selectedPlan.validity}</p>
                    <p><strong>Benefits:</strong> ${selectedPlan.benefits}</p>
                    <p><strong>OTT:</strong> ${selectedPlan.ott}</p>
                    <p><strong>Description:</strong> ${selectedPlan.description}</p>
                `;
            }
        })
        .catch(error => console.error("Error loading plan details:", error));
}
