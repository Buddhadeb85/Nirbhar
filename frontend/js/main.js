// ──────────────────────────────────────────────
// Existing Age Calculator (unchanged)
// ──────────────────────────────────────────────
function calculateAge(){
    const dob=document.getElementById("dob").value;
    const res=document.getElementById("result");

    if(!dob){
        res.innerHTML="<span class='error'>Please select your date of birth!</span>";
        return;
    }

    const birth=new Date(dob);
    const today=new Date();

    if(birth>today){
        res.innerHTML="<span class='error'>Date of birth cannot be in the future!</span>";
        return;
    }

    let y=today.getFullYear()-birth.getFullYear();
    let m=today.getMonth()-birth.getMonth();
    let d=today.getDate()-birth.getDate();

    if(d<0){
        m--;
        d+=new Date(today.getFullYear(),today.getMonth(),0).getDate();
    }
    if(m<0){
        y--;
        m+=12;
    }

    res.innerHTML=`Your age is:<br><strong>\( {y}</strong> years, <strong> \){m}</strong> months, <strong>${d}</strong> days`;
}
// ──────────────────────────────────────────────
// NEW: Enhanced Budget Planner Logic
// ──────────────────────────────────────────────
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
  }
  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

document.addEventListener('DOMContentLoaded', () => {
  const budgetForm = document.getElementById('budgetForm');
  if (budgetForm) {
    budgetForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const annualSalary = parseFloat(document.getElementById('annualSalary').value);
      const monthlySalary = Math.round(annualSalary / 12);
      const numDependents = parseInt(document.getElementById('numDependents').value);
      const dependentDetails = document.getElementById('dependentDetails').value;
      const location = document.getElementById('location').value.trim();
      
      // Dynamic adjustments (enhanced with more location logic)
      let foodPct = 30;
      let housingPct = 25;
      if (location.toLowerCase().includes('mumbai') || location.toLowerCase().includes('metro') || location.toLowerCase().includes('bangalore') || location.toLowerCase().includes('delhi')) {
        housingPct = 35;
      } else if (location.toLowerCase().includes('rural')) {
        housingPct = 20;
      }
      let healthPct = 10 + (dependentDetails.toLowerCase().includes('senior') ? 5 : 0);
      let educationPct = 10 + (dependentDetails.toLowerCase().includes('child') || dependentDetails.toLowerCase().includes('school') ? 5 : 0);
      let utilitiesPct = 8;
      let transportPct = 6;
      let clothingPct = 5;
      let savingsPct = 6;
      let miscPct = 5;
      
      // Normalize if over 100%
      let totalPct = foodPct + housingPct + healthPct + educationPct + utilitiesPct + transportPct + clothingPct + savingsPct + miscPct;
      if (totalPct > 100) {
        const scale = 100 / totalPct;
        foodPct *= scale;
        housingPct *= scale;
        healthPct *= scale;
        educationPct *= scale;
        utilitiesPct *= scale;
        transportPct *= scale;
        clothingPct *= scale;
        savingsPct *= scale;
        miscPct *= scale;
      }

      const allocations = [
        {name: "Food & Groceries", pct: foodPct.toFixed(1), amount: 0, guide: "Home-cooked meals, use ration card, buy in bulk from local markets."},
        {name: "Housing (Rent/EMI)", pct: housingPct.toFixed(1), amount: 0, guide: "Prioritize affordable areas; explore PMAY if eligible."},
        {name: "Healthcare", pct: healthPct.toFixed(1), amount: 0, guide: "Generic medicines, Ayushman Bharat, regular check-ups for seniors."},
        {name: "Education", pct: educationPct.toFixed(1), amount: 0, guide: "Government schools, scholarships, free mid-day meals."},
        {name: "Utilities", pct: utilitiesPct.toFixed(1), amount: 0, guide: "LED bulbs, limit AC/fan use, bundled plans."},
        {name: "Transportation", pct: transportPct.toFixed(1), amount: 0, guide: "Public transport, shared autos, fuel-efficient vehicle."},
        {name: "Clothing & Personal Care", pct: clothingPct.toFixed(1), amount: 0, guide: "Buy during sales, reuse/hand-me-downs."},
        {name: "Savings & Investments", pct: savingsPct.toFixed(1), amount: 0, guide: "Emergency fund first, then RD/SIP/PPF."},
        {name: "Miscellaneous", pct: miscPct.toFixed(1), amount: 0, guide: "Festivals, repairs, small emergencies."}
      ];

      // Calculate monthly amounts
      allocations.forEach(item => {
        item.amount = Math.round((parseFloat(item.pct) / 100) * monthlySalary);
      });

      // Monthly Budget Table
      let monthlyHTML = `<h3>Monthly Budget for ${location}</h3>`;
      monthlyHTML += `<p><strong>Monthly Income:</strong> ₹${monthlySalary.toLocaleString('en-IN')}</p>`;
      monthlyHTML += `<p><strong>Family Size:</strong> ${numDependents + 1} (including you)</p>`;
      monthlyHTML += `<p><strong>Dependents:</strong> ${dependentDetails}</p>`;
      monthlyHTML += `<table>
          <thead>
              <tr>
                  <th>Category</th>
                  <th>Percentage</th>
                  <th>Amount (₹)</th>
                  <th>Guidance</th>
              </tr>
          </thead>
          <tbody>`;
      allocations.forEach(item => {
        monthlyHTML += `<tr>
            <td data-label="Category">${item.name}</td>
            <td data-label="Percentage">${item.pct}%</td>
            <td data-label="Amount">₹${item.amount.toLocaleString('en-IN')}</td>
            <td data-label="Guidance">${item.guide}</td>
        </tr>`;
      });
      monthlyHTML += `</tbody></table>`;
      document.getElementById('monthlyOutput').innerHTML = monthlyHTML;

      // Yearly Summary (enhanced with more personalized advice)
      let yearlyHTML = `<h3>Yearly Budget Summary</h3>`;
      yearlyHTML += `<p><strong>Total Annual Income:</strong> ₹${annualSalary.toLocaleString('en-IN')}</p>`;
      const annualSavings = allocations.find(a => a.name.includes("Savings")).amount * 12;
      yearlyHTML += `<p><strong>Projected Annual Savings:</strong> ₹${annualSavings.toLocaleString('en-IN')}</p>`;
      yearlyHTML += `<p><strong>Key Annual Expenses to Plan For:</strong></p><ul>`;
      yearlyHTML += `<li>School Fees/Books: ₹20,000–40,000</li>`;
      yearlyHTML += `<li>Health Insurance Premium: ₹15,000–25,000</li>`;
      yearlyHTML += `<li>Festivals & Clothing: ₹15,000–25,000</li>`;
      yearlyHTML += `<li>Home Maintenance: ₹10,000–20,000</li></ul>`;
      yearlyHTML += `<p><strong>Advice:</strong> Review budget every 3 months. Adjust for inflation (6–8% expected in 2026). Aim to increase savings to 10% in 2 years. For Durgapur residents, consider local schemes like WB health cards.</p>`;
      document.getElementById('yearlyOutput').innerHTML = yearlyHTML;

      // Tips Section (enhanced with more 2026-relevant tips)
      document.getElementById('tipsSection').innerHTML = `
          <h3>Investment & Extra Income Tips</h3>
          <ul>
              <li><strong>Emergency Fund:</strong> Save 3–6 months of expenses in a high-interest savings account (up to 7% in 2026).</li>
              <li><strong>Low-Risk Investments:</strong> Start Recurring Deposit (RD) or SIP in index funds (₹500–1,000/month) via Groww/Paytm Money.</li>
              <li><strong>Government Schemes:</strong> PPF (7.1%), SCSS for seniors (8.2%), Sukanya Samriddhi if you have a girl child.</li>
              <li><strong>Extra Income Ideas:</strong> Tutoring, freelance work (data entry, content writing), small home business (tiffin service, tailoring), YouTube channel on budgeting tips.</li>
              <li><strong>Tax Saving:</strong> Invest in ELSS funds under 80C (up to ₹1.5 lakh deduction). Consider NPS for retirement.</li>
              <li><strong>2026 Tip:</strong> Explore digital gigs on Upwork or local apps like UrbanClap for side income in Durgapur.</li>
          </ul>`;

      // Future Ideas (unchanged but can be expanded later)
      document.getElementById('futureSection').innerHTML = `
          <h3>Future Development Ideas</h3>
          <ul>
              <li>Expense tracking with daily logging and charts.</li>
              <li>Auto-adjust budget based on inflation data (API integration).</li>
              <li>Goal setting: Children's education, retirement calculator.</li>
              <li>PDF report generation with pie charts.</li>
              <li>Mobile app (Android/iOS) with notifications for bills.</li>
              <li>Integration with UPI/banks for real transaction import.</li>
              <li>AI suggestions based on spending patterns.</li>
          </ul>`;

      // Save to localStorage for persistence
      localStorage.setItem('latestBudgetAllocations', JSON.stringify({
        monthlyIncome: monthlySalary,
        allocations: allocations
      }));

      // Auto-switch to Monthly tab
      const monthlyTabButton = document.querySelector('.tabs .tab-button:nth-child(2)');
      openTab({currentTarget: monthlyTabButton}, 'Monthly');
    });
  }
});