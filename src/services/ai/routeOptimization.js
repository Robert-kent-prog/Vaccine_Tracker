// src/services/ai/routeOptimization.js
export const routeOptimization = {
  // Optimize CHW visitation routes
  optimizeVisitationRoutes: (visits, chwLocation, constraints = {}) => {
    const {
      maxVisitsPerDay = 8,
      maxTravelDistance = 50, // km
      workingHours = 8,
      priorityVisits = []
    } = constraints;

    // Filter and prioritize visits
    const prioritizedVisits = prioritizeVisits(visits, priorityVisits);
    
    // Group visits by geographic clusters
    const clusters = clusterVisits(prioritizedVisits, chwLocation);
    
    // Generate optimized routes for each cluster
    const routes = clusters.map(cluster => 
      generateRouteForCluster(cluster, chwLocation, {
        maxVisitsPerDay,
        maxTravelDistance,
        workingHours
      })
    );

    return {
      routes,
      summary: generateRouteSummary(routes),
      constraintsUsed: constraints
    };
  },

  // Calculate optimal facility locations
  optimizeFacilityLocations: (populationData, existingFacilities, constraints = {}) => {
    const {
      maxDistance = 10, // km
      minPopulation = 1000,
      budget = 5
    } = constraints;

    // Identify coverage gaps
    const coverageGaps = identifyCoverageGaps(populationData, existingFacilities, maxDistance);
    
    // Propose new facility locations
    const proposedLocations = proposeNewLocations(coverageGaps, populationData, {
      minPopulation,
      budget
    });

    return {
      coverageGaps,
      proposedLocations,
      expectedImpact: calculateExpectedImpact(proposedLocations, coverageGaps),
      recommendations: generateLocationRecommendations(proposedLocations, coverageGaps)
    };
  },

  // Optimize vaccine distribution routes
  optimizeDistributionRoutes: (facilities, distributionCenter, vaccineQuantities, constraints = {}) => {
    const {
      vehicleCapacity = 1000, // vials
      coldChainRequirements = true,
      deliveryWindows = []
    } = constraints;

    // Group facilities by region
    const regions = groupFacilitiesByRegion(facilities, distributionCenter);
    
    // Generate distribution routes
    const distributionRoutes = regions.map(region =>
      generateDistributionRoute(region, distributionCenter, vaccineQuantities, {
        vehicleCapacity,
        coldChainRequirements,
        deliveryWindows
      })
    );

    return {
      distributionRoutes,
      totalDistance: calculateTotalDistance(distributionRoutes),
      efficiency: calculateDistributionEfficiency(distributionRoutes),
      constraints: constraints
    };
  }
};

// Helper functions for route optimization
function prioritizeVisits(visits, priorityVisits) {
  return visits.map(visit => {
    let priority = 1; // Default priority
    
    // High priority for defaulters
    if (visit.status === 'defaulter') priority = 3;
    
    // Medium priority for upcoming vaccinations
    if (visit.daysUntilDue && visit.daysUntilDue <= 7) priority = 2;
    
    // Custom priority from input
    if (priorityVisits.includes(visit.id)) priority = 4;

    return { ...visit, priority };
  }).sort((a, b) => b.priority - a.priority);
}

function clusterVisits(visits, chwLocation) {
  const clusters = [];
  const visited = new Set();

  visits.forEach(visit => {
    if (visited.has(visit.id)) return;

    const cluster = [visit];
    visited.add(visit.id);

    // Find nearby visits (within 5km)
    visits.forEach(otherVisit => {
      if (!visited.has(otherVisit.id) && 
          calculateDistance(visit.location, otherVisit.location) <= 5) {
        cluster.push(otherVisit);
        visited.add(otherVisit.id);
      }
    });

    clusters.push(cluster);
  });

  return clusters;
}

function generateRouteForCluster(cluster, chwLocation, constraints) {
  const { maxVisitsPerDay, maxTravelDistance, workingHours } = constraints;
  
  // Start with CHW location
  let currentLocation = chwLocation;
  const route = [];
  let totalDistance = 0;
  let totalTime = 0;

  // Use nearest neighbor algorithm
  const unvisited = [...cluster];
  
  while (unvisited.length > 0 && route.length < maxVisitsPerDay) {
    // Find nearest unvisited location
    let nearestIndex = -1;
    let minDistance = Infinity;

    unvisited.forEach((visit, index) => {
      const distance = calculateDistance(currentLocation, visit.location);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIndex = index;
      }
    });

    if (nearestIndex === -1) break;

    const nextVisit = unvisited[nearestIndex];
    const travelTime = calculateTravelTime(minDistance);
    const visitTime = estimateVisitTime(nextVisit);

    // Check constraints
    if (totalDistance + minDistance > maxTravelDistance) break;
    if (totalTime + travelTime + visitTime > workingHours * 60) break;

    // Add to route
    route.push({
      ...nextVisit,
      travelDistance: minDistance,
      travelTime,
      visitTime,
      arrivalTime: totalTime + travelTime
    });

    totalDistance += minDistance;
    totalTime += travelTime + visitTime;
    currentLocation = nextVisit.location;
    unvisited.splice(nearestIndex, 1);
  }

  // Add return to base
  const returnDistance = calculateDistance(currentLocation, chwLocation);
  totalDistance += returnDistance;

  return {
    visits: route,
    totalDistance: Math.round(totalDistance * 100) / 100,
    totalTime: Math.round(totalTime),
    efficiency: calculateRouteEfficiency(route, totalDistance)
  };
}

function calculateDistance(loc1, loc2) {
  // Haversine formula for great-circle distance
  const R = 6371; // Earth's radius in km
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calculateTravelTime(distance) {
  // Assume average speed of 5km/h for walking in rural areas
  return (distance / 5) * 60; // in minutes
}

function estimateVisitTime(visit) {
  // Base time plus additional time based on visit type
  let baseTime = 15; // minutes
  
  if (visit.type === 'defaulter_followup') baseTime += 10;
  if (visit.type === 'vaccination') baseTime += 20;
  if (visit.type === 'registration') baseTime += 15;

  return baseTime;
}

function calculateRouteEfficiency(visits, totalDistance) {
  if (visits.length === 0) return 0;
  
  const totalPriority = visits.reduce((sum, visit) => sum + (visit.priority || 1), 0);
  const distancePerVisit = totalDistance / visits.length;
  
  // Higher efficiency score for more high-priority visits with less distance
  return (totalPriority * 10) / (distancePerVisit || 1);
}

function generateRouteSummary(routes) {
  const totalVisits = routes.reduce((sum, route) => sum + route.visits.length, 0);
  const totalDistance = routes.reduce((sum, route) => sum + route.totalDistance, 0);
  const avgEfficiency = routes.reduce((sum, route) => sum + route.efficiency, 0) / routes.length;

  return {
    totalRoutes: routes.length,
    totalVisits,
    totalDistance: Math.round(totalDistance * 100) / 100,
    averageEfficiency: Math.round(avgEfficiency * 100) / 100,
    estimatedTime: routes.reduce((sum, route) => sum + route.totalTime, 0)
  };
}

// Additional optimization functions would continue here...